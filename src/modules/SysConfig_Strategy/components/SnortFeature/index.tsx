import * as React from 'react'
import Card from 'domainComponents/Card'
import TableWithRemote from 'domainComponents/TableWithRemote'
import { getColumns } from "./tableConfig"
import { SYS_CONFIG_STRATEGY_SNORT } from 'constants/model'
import PostForm from './PostForm'
import WithModal from 'components/WithModal'
import extraConnect from 'domainUtils/extraConnect'
import { Button, Icon, Modal, message as Message, Select, Upload } from 'antd'
import { getCache, setCache } from 'utils'
import Spin from 'domainComponents/Spin'
import ApiConfig from 'services/apiConfig'
import WithConfig from 'domainComponents/WithConfig'
import path from 'constants/path'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig'
const httpApi = ApiConfig.http
const Option = Select.Option
const Dragger = Upload.Dragger
const SNORT_CACHE_NAMESPACE = "@@__SNORT__@@"
const mapStateToProps = state => {
  const effectsLoading = state.loading.effects
  return {
    postLoading: effectsLoading[`${SYS_CONFIG_STRATEGY_SNORT}/post`],
    putLoading: effectsLoading[`${SYS_CONFIG_STRATEGY_SNORT}/put`],
    deleteLoading: effectsLoading[`${SYS_CONFIG_STRATEGY_SNORT}/delete`],
    applyLoading: effectsLoading[`${SYS_CONFIG_STRATEGY_SNORT}/apply`],
    fetchLoading: effectsLoading[`${SYS_CONFIG_STRATEGY_SNORT}/fetch`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    post: payload => dispatch({
      type: `${SYS_CONFIG_STRATEGY_SNORT}/post`,
      payload
    }),
    delete: payload => dispatch({
      type: `${SYS_CONFIG_STRATEGY_SNORT}/delete`,
      payload
    }),
    put: payload => dispatch({
      type: `${SYS_CONFIG_STRATEGY_SNORT}/put`,
      payload
    }),
    apply: payload => dispatch({
      type: `${SYS_CONFIG_STRATEGY_SNORT}/apply`,
      payload
    })
  }
}

@extraConnect(mapStateToProps, mapDispatchToProps)
@WithModal()
@WithConfig(path.layoutConfig.snortFeature)
export default class WhiteList extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      activeItems: [],
      lastReqTime: 0,
      initialFilters: {
        page: 1,
        limit: 10,
        id: "",
        updateTime: "",
      },
      visible: false,
      snortrule: ""
    }
  }
  setVisible = (visible) => {
    this.setState({ visible })
  }
  reload = () => {
    this.setState({
      activeItems: [],
      lastReqTime: new Date().getTime()
    })
  }
  onSubmit = payload => {
    this.props.post(payload).then(_ => {
      Message.success("添加成功")
      payload.id == ""
        ?
        this.props.setModalVisible("create", false)
        :
        this.props.setModalVisible("edit", false)
      this.reload()
    })
  }
  onDel = idList => {
    const { onChange } = this.props
    Modal.confirm({
      title: "删除规则",
      content: "确定后将无法恢复",
      onOk: _ => this.props.delete({ idList })
        .then(_ => {
          Message.success("删除规则成功")
          this.reload()
        })
    })
  }
  onPut = payload => {
    this.props.put(payload).then(_ => {
      Message.success("修改成功")
    })
    setTimeout(() => this.setState({
      lastReqTime: new Date().getTime()
    }), 200)
  }
  onMulClick = value => {
    const { activeItems } = this.state
    const idList = activeItems.map((i) => i.id)
    value != "del"
      ?
      this.props.put({ idList, status: value }).then(_ => {
        Message.success("修改成功")
        this.reload()
      })
      :
      this.onDel(idList)
  }

  onEditClick = (records) => {
    this.props.setModalVisible("edit", true)
    this.setState({
      activeRule: records,
    })
  }
  setSnortrule = (snortrule) => {
    this.setState({ snortrule })
  }
  postSnortRule = () => {
    const { snortrule } = this.state;
    this.props.post({ id: "", snortrule: snortrule })
      .then(_ => {
        Message.success("上传成功")
        this.setVisible(false)
        this.setState({
          lastReqTime: new Date().getTime()
        })
      })
  }
  render() {
    const { postLoading, putLoading, applyLoading, deleteLoading, fetchLoading } = this.props
    const { activeItems, initialFilters, activeRule } = this.state
    const { setSnortrule } = this
    const fileProps = {
      name: "file",
      multiple: false,
      beforeUpload: (file, fileList) => {

        let reader = new FileReader()
        reader.readAsText(file)
        reader.onload = function (e) { //读取完文件之后会回来这里
          var fileString = this.result; // 读取文件内容
          setSnortrule(fileString)
        }
        return false;
      },
    }

    const title = (
      <div style={{ overflow: "hidden" }}>
        <div style={{ float: "left", width: "100%" }}>
          <Button type="primary"
            icon="plus"
            onClick={_ => this.props.setModalVisible("create", true)}
            disabled={putLoading || applyLoading}
            style={{ marginLeft: "15px" }}>
            添加自定义snort特征
          </Button>
          <div style={{ display: "inline-block", marginLeft: "10px", marginRight: "10px" }}>
            <Button onClick={_ => this.setVisible(true)}>
              <Icon type="upload" />导入自定义snort特征
            </Button>
          </div>
          <Select defaultValue="1" key={`${this.state.lastReqTime}-oprtion-with-remote`} style={{ width: 120 }} onSelect={this.onMulClick} disabled={activeItems.length === 0 || putLoading || applyLoading}>
            <Option value="1">启用特征</Option>
            <Option value="0">停用特征</Option>
            <Option value="del">批量删除</Option>
          </Select>


        </div>
      </div>
    )

    return (
      <div style={{ padding: "5px" }}>
        <Card title={title}>
          <TableWithRemote
            initialFilters={initialFilters}
            key={`${this.state.lastReqTime}-table`}
            rowSelection={{
              onChange: (_, activeItems) => {
                this.setState({
                  activeItems
                })
              }
            }}
            loading={applyLoading || putLoading || deleteLoading || fetchLoading}
            remoteNamespace={SYS_CONFIG_STRATEGY_SNORT}
            // pagination={false}
            getColumns={option => {
              return combineColumnsConfig(getColumns({
                ...option, handle: {
                  delete: this.onDel,
                  put: this.onPut,
                  edit: this.onEditClick,
                }
              }), this.props.config.columns)
            }}>
          </TableWithRemote>
        </Card>
        <Modal
          width={700}
          title={
            <div><Icon type="plus"></Icon>&nbsp;修改自定义snort特征</div>
          }
          closable={!postLoading}
          onCancel={_ => this.props.setModalVisible("edit", false)}
          visible={this.props.modalVisible["edit"]}
          footer={null}
          destroyOnClose={true}>
          <PostForm isCreate={false} onSubmit={this.onSubmit} loading={postLoading} defaultValue={activeRule} onCancel={_ => this.props.setModalVisible("edit", false)}></PostForm>
        </Modal>
        <Modal
          width={700}
          title={
            <div><Icon type="plus"></Icon>&nbsp;添加自定义snort特征</div>
          }
          closable={!postLoading}
          onCancel={_ => this.props.setModalVisible("create", false)}
          visible={this.props.modalVisible["create"]}
          footer={null}
          destroyOnClose={true} >
          <PostForm isCreate={true} onSubmit={this.onSubmit} loading={postLoading} onCancel={_ => this.props.setModalVisible("create", false)}></PostForm>
        </Modal>
        <Modal
          title={
            <div><Icon type="plus"></Icon>&nbsp;导入自定义snort特征</div>
          }
          closable={!postLoading}
          onCancel={_ => this.setVisible(false)}
          visible={this.state.visible}
          footer={null}
          destroyOnClose={true}>
          <Dragger {...fileProps} style={{ margin: "10px 0" }} disabled={postLoading}>
            <p className="ant-upload-drag-icon" style={{ marginTop: "15px" }}>
              <Icon type="file-text" />
            </p>
            <p>点击或拖拽文件到此处</p>
          </Dragger>
          <br />
          <Button type="primary" onClick={this.postSnortRule} loading={postLoading} >
            <Icon type="upload" />上传
            </Button>
        </Modal>
      </div>
    )
  }
} 