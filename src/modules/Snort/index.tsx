import React from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import styles from './styles.css'
import { Button, Modal, Upload, message as Message, Row, Col, Tooltip } from 'antd'
import exampleRule from './exampleRule'
import { getCache, setCache } from 'utils'
import { NAMESPACE, POST_SNORT_RULE_ACTION, RULE_CONTENT_DATA_INDEX, FETCH_SNORT_RULE_ACTION } from './ConstConfig'
import { connect } from 'dva'
import Spin from 'domainComponents/Spin'
import extraConnect from 'domainUtils/extraConnect'
import WithAnimateRender from 'components/WithAnimateRender'

const SNORT_CACHE_NAMESPACE = "@@__SNORT__@@"

const getInitValue = () => {
  try {
    const cache = getCache(SNORT_CACHE_NAMESPACE).value

    if (cache.trim().length === 0) {
      return exampleRule
    }

    return cache
  } catch (e) {
    console.error(e)
    return exampleRule
  }
}


const getDraft = () => {
  try {
    const cache = getCache(SNORT_CACHE_NAMESPACE).value
    if (cache === null) {
      return null
    }
    if (cache.trim().length !== 0) {
      return cache
    }
    return null
  } catch (e) {

    return null
  }
}

const mapStateToProps = state => {
  return {
    postSnortRuleLoading: state.loading.effects[`${NAMESPACE}/${POST_SNORT_RULE_ACTION}`],
    fetchSnortRuleLoading: state.loading.effects[`${NAMESPACE}/${FETCH_SNORT_RULE_ACTION}`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postSnortRule: payload => dispatch({
      type: `${NAMESPACE}/${POST_SNORT_RULE_ACTION}`,
      payload
    }),
    fetchSnortRule: payload => dispatch({
      type: `${NAMESPACE}/${FETCH_SNORT_RULE_ACTION}`,
      payload
    })
  }
}

@WithAnimateRender
@extraConnect(mapStateToProps, (mapDispatchToProps))
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      value: ""
    }
  }
  componentDidMount() {
    this.fetchSnortRule()
    this.checkDraft()
  }
  checkDraft = () => {
    const draft = getDraft()
    if (draft !== null) {
      Modal.confirm({
        title: "草稿",
        content: "检测到存在未上传到草稿，是否显示草稿内容？",
        onOk: _ => {
          this.setState({
            value: draft
          })
          return Promise.resolve()
        }
      })
    }
  }
  getBreadcrumb = () => {
    return (
      <div key="bread-crumb" style={{ margin: "15px 0" }}>
        {this.props.getBreadcrumb(this.props.routes)}
      </div>
    )
  }
  fetchSnortRule = () => {
    this.props
      .fetchSnortRule()
      .then(value => this.setState({ value }))
  }
  postSnortRule = () => {
    this.props
      .postSnortRule({ [RULE_CONTENT_DATA_INDEX]: this.state.value })
      .then(_ => {
        Message.success("上传成功")
        setCache(SNORT_CACHE_NAMESPACE, null)
        // this.updateEditorContent("")
      })
  }
  updateEditorContent = (value) => {
    try {
      this.setState({
        value
      })
      setCache(SNORT_CACHE_NAMESPACE, {
        value
      })

    } catch (e) {
      Message.error(e.message)
    }
  }
  render() {

    const { updateEditorContent } = this
    const { postSnortRuleLoading, fetchSnortRuleLoading } = this.props
    const { value } = this.state

    return (
      <div>
        <Spin spinning={postSnortRuleLoading || fetchSnortRuleLoading}>
          {
            this.props.animateRender([
              <CodeMirror
                key="editor"
                value={this.state.value}
                className={styles["editor"]}
                options={{
                  mode: 'string',
                  lineNumbers: true
                }}
                onBeforeChange={(editor, data, value) => {
                  updateEditorContent(value)
                }}
              />,
              <div style={{ margin: "10px 0", overflow: "hidden" }} key="operation">
                <div style={{ float: "left", margin: "0 10px 0 0" }}>
                  <Button
                    type="danger"
                    icon="delete"
                    onClick={_ => {

                      Modal.confirm({
                        title: "清除编辑器内容",
                        content: "是否清除所有已经编辑的内容(不可撤销)",
                        onOk: _ => {
                          updateEditorContent("")
                          return Promise.resolve()
                        }
                      })
                    }}>
                    清空编辑内容
            </Button>
                </div>

                <div style={{ float: "left", margin: "0 10px 0 0" }}>
                  <Upload {...{
                    name: "snort",
                    fileList: [],
                    beforeUpload: file => {

                      try {

                        const fileSizeKB = file.size / 1024
                        if (fileSizeKB > 1024 * 1) {
                          Message.warn("无法打开超过1MB的文件")
                          return false
                        }
                        let reader = new FileReader()
                        reader.onload = function (e) {
                          updateEditorContent(this.result)
                        }
                        reader.readAsText(file)
                      } catch (e) {
                        Message.error(e.message)
                      }

                      return false
                    }
                  }}>
                    <Button type="primary" icon="select">
                      选择文件替换自定义规则
                </Button>
                  </Upload>
                </div>
                <div style={{ float: "right" }}>
                  <Button
                    disabled={false}
                    type="primary"
                    icon="upload"
                    onClick={this.postSnortRule}>
                    上传编辑的内容
                  </Button>
                </div>
              </div>
            ])
          }
        </Spin>
      </div>
    )
  }
}

export default Page