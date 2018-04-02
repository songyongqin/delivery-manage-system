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

import { canLicenceDevice, getCanNotLicenceReason } from '../../domainUtils'


const INPUT_CODE = "inputCode", SHOW_LICENCE_RES = "showLicenceRes"

const getColumns = ({ getFieldDecorator, disabledList, step, loading }) => {
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
                      required: true, message: "授权码不能为空"
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
        } catch (e) {

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

    const { multiple } = this.props

    return (
      <div style={{ marginTop: "15px" }}>
        <div style={{ textAlign: "center" }}><span style={{ color: "red" }}>*</span>授权码请联系售后获取，需提供设备唯一标识码</div>
        <Row style={{ marginTop: "15px" }}>
          <If condition={multiple}>
            <Col span={8} style={{ textAlign: "center" }}>
              <Button
                type="primary">批量导出设备码</Button>
            </Col>
          </If>
          <If condition={multiple}>
            <Col span={8} style={{ textAlign: "center" }}>
              <Button
                type="primary">批量导入授权码文件</Button>
            </Col>
          </If>
          <Col span={multiple ? 8 : 24} style={{ textAlign: "center" }}>
            <Button
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
    hideNotValidItem: false
  }
  handleSubmit = e => {
    e.preventDefault()
    const { onSubmit, form, deviceList } = this.props
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      const payload = Object.entries(values).map(([deviceId, code]) => {
        return {
          id: deviceId,
          code
        }
      })
      onSubmit && onSubmit(payload)
    })
  }
  render() {

    const { getFieldDecorator } = this.props.form
    const { hideNotValidItem, step } = this.state
    const { deviceList } = this.props


    return (
      <div>
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
        <Table
          pagination={false}
          tableProps={{
            columns: getColumns({ getFieldDecorator, step, disabledList: [], loading: false }),
            scroll: { y: 400 },
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

        <Operation multiple={deviceList.length > 1} onSubmit={this.handleSubmit}></Operation>
      </div>
    )
  }
}



const WrappedLicence: any = Form.create()(Licence)

export default WrappedLicence
