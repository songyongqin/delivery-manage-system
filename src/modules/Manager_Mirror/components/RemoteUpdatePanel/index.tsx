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
import RoUpdateResultPanel from '../roUpdateResultPanel'
import UpdateResultPanel from '../UpdateResultPanel'
import extraConnect from 'domainUtils/extraConnect'
import EnhanciveTable from 'domainComponents/Table'
const mirrorImageManagerConfig = get(getAppConfig(), ["mirrorImageManager"], {})


const UploadPanel = ({
  updateLoading,
  serverUrl,
  percent,
  progressState,
  res,
  onCancel,
  getres,
  errorstatus,
  message,
  getresData
}) => {
  const errorres = {
    status: errorstatus,
    message: message
  }

  if (getresData.status) {
    //get 成功时
    return <RoUpdateResultPanel onCancel={onCancel} res={getresData}></RoUpdateResultPanel>
  }
  if (errorstatus != 1) {
    //post/get 不成功时
    return <RoUpdateResultPanel onCancel={onCancel} res={errorres}></RoUpdateResultPanel>
  }


  const data = {
    url: serverUrl,
    percent: percent,
    progressState: progressState
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
        render: percent => {
          return (
            <div style={{ padding: "5px" }}>
              <Progress
                percent={percent} >
              </Progress>
            </div>
          )
        }
      },
      // {
      //   key: "operation",
      //   title: "更新状态",
      //   render: records => {
      //     return (
      //       <div>
      //         <Button
      //           loading={updateLoading}
      //           style={{ marginRight: "15px" }}
      //           onClick={uploadHandle}
      //           type="primary"
      //           icon="upload">
      //           {updateLoading ? "升级中..." : "点击升级"}
      //         </Button>
      //       </div>
      //     )
      //   }
      // }
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
      percent: 0,
      progressState: 0,
      getres: null,
    }
  }

  // componentDidMount() {
  //   if (this.props.progressState != 0) {
  //     this.props.prosave(0);
  //   }
  //   else {
  //     this.props.prosave(1);
  //   }
  // }

  fetchtime = () => {

    const interval = setInterval(
      () => {
        this.props.updateRemoteProgress();
        if (this.props.ProgessData.progressState == 1) {
          const { serverUrl } = this.props;
          this.props.getupdateRemote({ serverUrl })
          clearInterval(interval);
        }
        if (this.props.errorstatus != 1) {
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
          res => {
            this.setState({
              res,
            })
            if (res.status == 1) { this.fetchtime() }

          }
        )
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { serverUrl, ProgessData, getresData, updateLoading, defaultValue = {}, isDark, loading = false, textConfig = {}, style = {}, keyConfig = "value", onCancel, errorstatus, message, percent, progressState, postSave } = this.props;
    const { value = mirrorImageManagerConfig.updateUrl } = defaultValue;
    const { res, getres } = this.state;
    const lblClasses = classnames({
      "lbl-dark": isDark
    })

    return (
      <Form>
        {
          this.props.postState == 1
            ?
            <UploadPanel updateLoading={updateLoading} serverUrl={serverUrl} percent={ProgessData.percent} progressState={ProgessData.progressState} res={res} onCancel={onCancel} getres={getres} errorstatus={errorstatus} message={message} getresData={getresData}>
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
    postState: state[OPERATION_NAMESPACE].postState,
    percent: state[OPERATION_NAMESPACE].percent,
    serverUrl: state[OPERATION_NAMESPACE].serverUrl,
    progressState: state[OPERATION_NAMESPACE].progressState,
    getresData: state[OPERATION_NAMESPACE].getresData,
    ProgessData: state[OPERATION_NAMESPACE].ProgessData
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postSave: payload => {
      // ownProps.hideOptionPanel()
      return dispatch({
        type: `${OPERATION_NAMESPACE}/postSave`,
        payload
      })
    },
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






