import { connect } from 'dva';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker, Progress } from 'antd';
import React from 'react';
import classnames from 'classnames'
import { getAppConfig } from 'domain/app'
import { get } from 'utils'
const FormItem = Form.Item;
import {
  OPERATION_NAMESPACE,
} from '../../ConstConfig'
import JoSpin from 'domainComponents/Spin'
import UpdateResultPanel from '../UpdateResultPanel'
import extraConnect from 'domainUtils/extraConnect'
import EnhanciveTable from 'domainComponents/Table'
const mirrorImageManagerConfig = get(getAppConfig(), ["mirrorImageManager"], {})


const UploadPanel = ({
  updateLoading,
  serverUrl,
  datalist,
  res,
  uploadHandle,
  onCancel,
  getres,
  errorstatus,
  message
}) => {
  if (getres) {

    return <UpdateResultPanel onCancel={onCancel} res={getres}></UpdateResultPanel>

  }
  const errorres = {
    status: errorstatus,
    message: message
  }
  if (errorstatus) {
    return <UpdateResultPanel onCancel={onCancel} res={errorres}></UpdateResultPanel>
  }
  const data = {
    url: serverUrl,
    percent: datalist.percent,
    progressState: datalist.progressState
  }
  const tableProps = {
    dataSource: [
      {
        ...data,
        key: "uploadInfo"
      }
    ],
    columns: [
      {
        dataIndex: "url",
        title: "服务器地址",
      },
      {
        dataIndex: "percent",
        title: "更新状态",
        render: value => {
          return (
            <div style={{ padding: "5px" }}>
              <Progress
                percent={value} >
              </Progress>
            </div>
          )
        }
      },
      {
        key: "operation",
        title: "更新状态",
        render: records => {
          return (
            <div>
              <Button
                loading={updateLoading}
                style={{ marginRight: "15px" }}
                onClick={uploadHandle}
                type="primary"
                icon="upload">
                {updateLoading ? "升级中..." : "点击升级"}
              </Button>
            </div>
          )
        }
      }
    ]
  }

  return (
    <div>
      {/* <JoSpin spinning={}> */}
      <EnhanciveTable
        tableProps={tableProps}
        pagination={false}>

      </EnhanciveTable>
      {/* </JoSpin> */}
    </div>
  )

}


class RemoteUpdate extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      res: null,
      serverUrl: "",
      datalist: {
        url: "",
        percent: 0,
        progressState: 0
      },
      getres: null,
    }
  }
  fetchtime = () => {
    const { serverUrl } = this.state;
    const interval = setInterval(
      () => {
        this.props.updateRemoteProgress()
          .then(
            res => {
              this.setState({
                datalist: {
                  url: this.state.serverUrl,
                  percent: res.payload.percent,
                  progressState: res.payload.progressState
                }
              })
              if (res.payload.progressState == 1) {
                const { serverUrl } = this.state;
                this.setState({
                  datalist: {
                    url: serverUrl,
                    percent: res.payload.percent,
                    progressState: res.payload.progressState
                  }
                })
                clearInterval(interval);
                this.props.getupdateRemote({ serverUrl })
                  .then(
                    getres => this.setState({ getres })
                  )
              }
            }
          );
        if (this.props.errorstatus) {
          clearInterval(interval);
        }

      }
      , 1000)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (this.props.loading) {
        return;
      }

      if (err) {
        return;
      }

      this.props.onSubmit && this.props.onSubmit(values)
        .then(
          res => this.setState({
            res,
            serverUrl: values.value
          })
        )
      // .then(this.fetchtime())
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const { updateLoading, defaultValue = {}, isDark, loading = false, textConfig = {}, style = {}, keyConfig = "value", onCancel, errorstatus, message } = this.props;
    const { value = mirrorImageManagerConfig.updateUrl } = defaultValue;
    const { res, datalist, serverUrl, getres, } = this.state;
    const lblClasses = classnames({
      "lbl-dark": isDark
    })

    return (
      <Form>
        {
          res
            ?
            <UploadPanel updateLoading={updateLoading} serverUrl={serverUrl} datalist={datalist} res={res} uploadHandle={this.fetchtime} onCancel={onCancel} getres={getres} errorstatus={errorstatus} message={message}>
            </UploadPanel>
            // <UpdateResultPanel
            //   onCancel={this.props.onCancel}
            //   isDark={isDark}
            //   res={res}>
            // </UpdateResultPanel>
            :
            <JoSpin spinning={loading}>
              <FormItem required={false}
                colon={false}
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 10 }}
                label={<span className={lblClasses}>升级服务器地址</span>}>
                {getFieldDecorator(keyConfig, {
                  initialValue: value,
                  rules: [
                    {
                      required: true, message: "不能为空"
                    }
                  ]
                })(
                  <Input placeholder={"请输入服务器地址"}
                    disabled={loading}
                    onPressEnter={this.handleSubmit} />
                )}
              </FormItem>
              <FormItem required={false}
                colon={false}
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 10 }}
                label={"  "}>
                <Button
                  type="primary"
                  size="large"
                  loading={loading}
                  onClick={this.handleSubmit}>确定</Button>
              </FormItem>
            </JoSpin>
        }

      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading.effects[`${OPERATION_NAMESPACE}/updateRemote`],
    updateLoading: state[OPERATION_NAMESPACE].updateLoading,
    errorstatus: state[OPERATION_NAMESPACE].errorstatus,
    message: state[OPERATION_NAMESPACE].message,
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: payload => {
      ownProps.hideOptionPanel()
      return dispatch({
        type: `${OPERATION_NAMESPACE}/updateRemote`,
        payload
      })
    },
    initUploadTask: payload => dispatch({
      type: `${OPERATION_NAMESPACE}/initUploadTask`,
      payload
    }),
    getupdateRemote: payload => {
      ownProps.hideOptionPanel()
      return dispatch({
        type: `${OPERATION_NAMESPACE}/getupdateRemote`,
        payload
      })
    },
    updateRemoteProgress: payload => {
      return dispatch({
        type: `${OPERATION_NAMESPACE}/updateRemoteProgress`,
        payload
      })
    }
  }
}

export default extraConnect(
  mapStateToProps,
  (mapDispatchToProps)
)(Form.create()(RemoteUpdate));






