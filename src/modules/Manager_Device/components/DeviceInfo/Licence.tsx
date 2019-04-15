import * as React from 'react'
import {
  Upload,
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Slider,
  message as Message,
  Switch,
} from 'antd';
import styles from './styles.css';
import classnames from 'classnames';
import {
  CODE_DATAINDEX,
  LICENCE_STATUS_DATAINDEX,
  LICENCE_VALID_VALUE,
  DEVICE_ID_DATAINDEX,
  CONNECT_STATUS_DATAINDEX,
  // ALLOW_AHEAD_LICENCE_DAY,
  LICENCE_STATUS_EXPIRATION_DATAINDEX,
  CONNECT,
} from '../../constants'
import Table from 'domainComponents/Table'
import { If } from 'components/ControlStatements'
const FormItem = Form.Item
const Dragger = Upload.Dragger
const LICENCE_SUCCESS = 1
import exportData from 'utils/exportData'
import isSuccess from 'domainUtils/isSuccess'
import { primaryColor } from 'themes/vars'

import { canLicenceDevice, getCanNotLicenceReason } from '../../domainUtils'


const INPUT_CODE = "inputCode", SHOW_LICENCE_RES = "showLicenceRes", SHOW_LICENCE_ERROR_ERS = "showLicenceErrorRes"

const checkDeviceId = (rule, value, callback) => {

  if (value.length <= 400) {
    callback();
  } else {
    callback('授权码最大长度不超过400');
  }
}

const InputCodeStepInfo = ({ getFieldDecorator, info, loading, disabledList }) => {
  return (
    <FormItem
      style={{ margin: "0" }}
      colon={false}
      required={true}
      hasFeedback={true}
    >
      {getFieldDecorator(`${info[DEVICE_ID_DATAINDEX]}`, {
        initialValue: "",
        rules: [
          {
            required: true, message: "授权码不能为空",

          },
          {
            validator: checkDeviceId,
          }
        ]
      })(
        <Input
          placeholder="填写授权码"
          disabled={loading || disabledList.includes(info[DEVICE_ID_DATAINDEX])}>
        </Input>
      )}
    </FormItem>
  )
}

const ShowLicenceResStepInfo = ({ res, info }) => {
  try {

    let target = res.find(item => item["id"] === info["id"])

    if (!target) {
      return <div></div>
    }

    if (target.status === 1) {
      return (
        <div style={{ color: primaryColor, textAlign: "center" }}>
          <Icon type="check"></Icon> &nbsp;授权成功，<br />
          到期时间: {target["date"]}
        </div>
      )
    }

    return (
      <div style={{ color: "red", textAlign: "center" }}>
        <Icon type="close"></Icon> &nbsp;授权失败，<br />
        原因: {target.message}
      </div>
    )


  } catch (e) {
    return <div></div>
  }

}

const ShowLicenceErrorResInfo = ({ errorInfo }) => {
  return (
    <div style={{ color: "red", textAlign: "center" }}>
      <Icon type="close"></Icon> &nbsp;授权失败，<br />
      原因: {errorInfo}
    </div>
  )
}

const LicenceRes = ({ res, onCancel }) => {

  try {
    const reload = res.some(i => i.status === 1)

    return (
      <div style={{ marginTop: "15px" }}>
        <h4 style={{
          color: "#108ee9",
          textAlign: "center",
          fontWeight: 500
        }}>
          感谢您使用本产品，本次授权操作已完成，若存在授权失败的设备请尝试重新授权
        </h4>
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={_ => reload ? window.location.reload() : onCancel()}
            type="primary">
            {
              reload
                ?
                "确定(重新载入应用)"
                :
                "确定"
            }
          </Button>
        </div>
      </div>
    )
  } catch (e) {
    return <div></div>
  }
}

const getColumns = ({ getFieldDecorator, disabledList, step, loading, res, errorInfo }) => {
  return [
    {
      dataIndex: DEVICE_ID_DATAINDEX,
      title: <div style={{ textAlign: "center" }}>设备唯一标识</div>,
      width: "50%"
    },
    {
      key: "info",
      title: <div style={{ textAlign: "center" }}>授权信息</div>,
      width: "50%",
      render: info => {
        try {
          if (!canLicenceDevice(info)) {
            return <div style={{ textAlign: "center" }}>{getCanNotLicenceReason(info)}</div>
          }

          if (step === INPUT_CODE) {
            return <InputCodeStepInfo {...{ getFieldDecorator, disabledList, loading, info }}></InputCodeStepInfo>
          }

          if (step === SHOW_LICENCE_RES) {
            return <ShowLicenceResStepInfo {...{ res, info }}></ShowLicenceResStepInfo>
          }

          if (step === SHOW_LICENCE_ERROR_ERS) {
            return <ShowLicenceErrorResInfo {...{ errorInfo }}></ShowLicenceErrorResInfo>
          }

          return ""
        } catch (e) {
          console.error("info render :", e.message)
          return ""
        }
      }
    }
  ]
}

class Operation extends React.Component<any, any>{
  static defaultProps = {
    multiple: true
  }
  render() {

    const { multiple, loading } = this.props

    return (
      <div style={{ marginTop: "15px" }}>
        <div style={{ textAlign: "center" }}><span style={{ color: "red" }}>*</span>授权码请联系售后获取，需提供设备唯一标识码</div>
        <Row style={{ marginTop: "15px" }}>
          <If condition={multiple}>
            <Col span={8} style={{ textAlign: "center" }}>
              <Button
                disabled={loading}
                onClick={this.props.onExportClick}
                type="primary">批量导出设备码</Button>
            </Col>
          </If>
          <If condition={multiple}>
            <Col span={8} style={{ textAlign: "center" }}>
              <Button
                disabled={loading}
                onClick={this.props.onAutoInputClick}
                type="primary">批量导入授权码文件</Button>
            </Col>
          </If>
          <Col span={multiple ? 8 : 24} style={{ textAlign: "center" }}>
            <Button
              loading={loading}
              onClick={this.props.onSubmit}
              type="primary">
              授权
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

class Licence extends React.Component<any, any>{
  static defaultProps = {
    deviceList: [],
  }
  state = {
    step: INPUT_CODE,
    hideNotValidItem: false,
    uploadVisible: false,
    disabledList: [],
    res: [],
    errorInfo: ""
  }
  handleSubmit = e => {
    e.preventDefault()
    const { onSubmit, form, deviceList } = this.props
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }

      const payload = Object.entries(values).map(([deviceId, code]) => {
        try {
          return {
            id: deviceList.find(item => item["deviceId"] === deviceId)["id"],
            code
          }
        } catch (e) {
          console.error(`licence submit:${e.message}`)
          return {
            id: null,
            code
          }
        }
      })

      onSubmit && onSubmit(payload)
        .then(res => {
          this.setState({
            step: SHOW_LICENCE_RES,
            res
          })
        })
        .catch(errorInfo => {
          this.setState({
            step: SHOW_LICENCE_ERROR_ERS,
            errorInfo
          })
        })
    })
  }

  onAutoInputClick = () => {
    this.setState({
      uploadVisible: !this.state.uploadVisible
    })
  }

  exportDeviceIdList = () => {
    const { deviceList } = this.props
    const finalDeviceList = deviceList.filter(canLicenceDevice).map(i => i["deviceId"])
    exportData(JSON.stringify({ "deviceId": finalDeviceList }, null, 2), "deviceCodeList.json")
  }

  autoInputCode = payload => {
    try {
      const { deviceList, form } = this.props

      const codeMap = payload.reduce((target, item) => {

        let id = item["deviceId"]

        target[id] = item.code

        return target

      }, {})


      deviceList.forEach(device => {
        const deviceId = device["deviceId"]

        deviceId in codeMap
          ?
          form.setFieldsValue({ [deviceId]: codeMap[deviceId] })
          :
          form.setFields({
            [deviceId]: {
              value: "",
              errors: [
                new Error("授权码未提供，请确认授权码文件中包含该设备的授权，重新导入授权文件")
              ]
            }
          })
      })

      this.setState({
        disabledList: Object.keys(codeMap)
      })

    } catch (e) {
      console.error("autoInputCode: ", e.message)
    }
  }

  getHeader = () => {
    const { hideNotValidItem, step, uploadVisible } = this.state

    return (
      <div style={{ marginBottom: "15px" }}>
        <span>
          隐藏无法操作的设备 &nbsp;
      </span>
        <Switch
          onChange={hideNotValidItem => this.setState({ hideNotValidItem })}
          checkedChildren={<Icon type="check" />}
          unCheckedChildren={<Icon type="cross" />}
          checked={hideNotValidItem}>
        </Switch>
      </div>
    )
  }

  getInfoPanel = () => {

    const { getFieldDecorator } = this.props.form
    const { hideNotValidItem, step, uploadVisible, disabledList, res, errorInfo } = this.state
    const { deviceList, loading } = this.props
    return (
      <Table
        pagination={false}
        tableProps={{
          columns: getColumns({ getFieldDecorator, step, disabledList, loading, res, errorInfo }),
          scroll: { y: 320 },
          dataSource: deviceList
            .map(i => {
              return {
                ...i,
                key: `${i[DEVICE_ID_DATAINDEX]}-item`
              }
            })
            .filter(i => {
              if (hideNotValidItem) {
                return canLicenceDevice(i)
              }
              return true
            })
        }}>
      </Table>
    )
  }

  getOperationPanel = () => {
    const { deviceList, loading } = this.props
    const { step } = this.state

    return (
      <If condition={step === INPUT_CODE && deviceList.filter(canLicenceDevice).length !== 0}>
        <Operation
          loading={loading}
          onAutoInputClick={this.onAutoInputClick}
          onExportClick={this.exportDeviceIdList}
          multiple={deviceList.length > 1}
          onSubmit={this.handleSubmit}>
        </Operation>
      </If>
    )
  }

  getUploadPanel = () => {

    const { uploadVisible } = this.state

    let _this = this

    const fileProps = {
      name: "file",
      multiple: false,
      showUploadList: false,
      beforeUpload: (file, fileList) => {
        if (!file.name.endsWith(".json")) {
          Message.error("只支持导入JSON格式的文件")
          return false
        }
        let reader = new FileReader()
        reader.onload = function (e) {
          let content = []
          try {
            content = JSON.parse(this.result).licence

            Message.success("批量导入成功")

            _this.setState({
              uploadVisible: false
            })

            _this.autoInputCode(content)
          } catch (e) {
            Message.error("JSON文件内容格式错误")
          }
        }

        reader.readAsText(file)
        return false
      }
    }

    return (
      <If condition={uploadVisible}>
        <div style={{ marginTop: "15px" }}>
          <Dragger {...fileProps}>
            <div style={{ marginTop: "5px" }}>
              <Icon type="file-text" style={{ fontSize: "20px" }} />
            </div>
            <div>点击或拖拽文件到此处 仅支持JSON格式文件</div>
          </Dragger>
        </div>
      </If>
    )
  }

  getResPanel = () => {

    const { res, step } = this.state
    const { onCancel } = this.props

    return (
      <If condition={step === SHOW_LICENCE_RES || step === SHOW_LICENCE_ERROR_ERS}>
        <LicenceRes res={res} onCancel={onCancel}></LicenceRes>
      </If>
    )
  }

  render() {

    const { getFieldDecorator } = this.props.form
    const { hideNotValidItem, step, uploadVisible } = this.state
    const { deviceList } = this.props


    return (
      <div>
        {/* {this.getHeader()} */}
        {this.getInfoPanel()}
        {this.getOperationPanel()}
        {this.getUploadPanel()}
        {this.getResPanel()}
      </div>
    )
  }
}



const WrappedLicence: any = Form.create()(Licence)

export default WrappedLicence
