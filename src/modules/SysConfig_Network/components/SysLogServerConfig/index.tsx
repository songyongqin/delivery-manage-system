import * as React from 'react'
import { Input, Row, Col, Button, Tooltip, message as Message, Spin, Switch, Checkbox } from 'antd'
import { Form, Icon } from 'antd'
import {
  ENABLED_DATA_INDEX,
  SERVER_IP_DATA_INDEX,
  SERVER_PORT_DATA_INDEX,
  sysLogServerFormTextConfig
} from '../../constants'
import classnames from 'classnames'
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
import { ipReg, portReg } from 'utils/tools'
import extraConnect from 'domainUtils/extraConnect'
import Card from 'domainComponents/Card'
import { SYS_CONFIG_SYS_LOG_NAMESPACE } from 'constants/model'
import { When, Otherwise, Choose } from 'components/ControlStatements'

class WrappedForm extends React.Component<any, any> {
  remove = (index) => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    form.setFieldsValue({
      keys: keys.filter((key, i) => index !== i),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault()
    const { form, onSubmit } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      values = { ...values }
      values[ENABLED_DATA_INDEX] = values[ENABLED_DATA_INDEX] ? 1 : 0
      onSubmit && onSubmit(values)
    });
  };
  ipCheck = (rule, value, callback) => {
    if (ipReg.test(value)) {
      return callback()
    }
    callback("请输入正确的IP")
  }
  portCheck = (rule, value, callback) => {
    if (portReg.test(value)) {
      return callback()
    }
    callback("请输入正确的端口")
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { defaultValue = {}, isDark, loading, isAdmin } = this.props
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 12,
      },
    }


    const lblClasses = classnames({
      ["lbl-dark"]: isDark,
    })

    const enabled = getFieldValue(ENABLED_DATA_INDEX) || defaultValue[ENABLED_DATA_INDEX]

    const formContent = (
      <Form style={{ width: "800px" }}>
        <FormItem {...formItemLayout}
          colon={false}
          label={<span className={lblClasses}>
            {sysLogServerFormTextConfig[ENABLED_DATA_INDEX]}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>}>
          {getFieldDecorator(ENABLED_DATA_INDEX, {
            initialValue: defaultValue[ENABLED_DATA_INDEX] === 1,
            valuePropName: "checked"
          })(
            <Switch checkedChildren={"开"}
              unCheckedChildren={"关"}
              disabled={loading} />
          )}
        </FormItem>
        <FormItem {...formItemLayout}
          colon={false}
          required={true}
          label={<span className={lblClasses}>
            {sysLogServerFormTextConfig[SERVER_IP_DATA_INDEX]}
            &nbsp;
            <Tooltip title={"请填写正确的syslog服务器IP地址，并确认syslog服务器已正常运行"}>
              <a>
                <Icon type="question-circle-o" style={{ color: "#108ee9" }} />
              </a>
            </Tooltip>
          </span>}>
          {getFieldDecorator(SERVER_IP_DATA_INDEX, {
            initialValue: defaultValue[SERVER_IP_DATA_INDEX],
            rules: [
              {
                validator: this.ipCheck
              }
            ]
          })(
            <Input disabled={loading || !enabled}></Input>
          )}
        </FormItem>
        <FormItem {...formItemLayout}
          colon={false}
          required={true}
          label={<span className={lblClasses}>
            {sysLogServerFormTextConfig[SERVER_PORT_DATA_INDEX]}
            &nbsp;
            <Tooltip title={"请填写正确的syslog服务器端口号，并确认syslog服务器已正常运行"}>
              <a>
                <Icon type="question-circle-o" style={{ color: "#108ee9" }} />
              </a>
            </Tooltip>
          </span>}>
          {getFieldDecorator(SERVER_PORT_DATA_INDEX, {
            initialValue: defaultValue[SERVER_PORT_DATA_INDEX],
            rules: [
              {
                validator: this.portCheck
              }
            ]
          })(
            <Input disabled={loading || !enabled}></Input>
          )}
        </FormItem>

        <FormItem wrapperCol={{ span: 4, push: 6 }}
          colon={false}>
          <Button type="primary"
            disabled={loading}
            icon="save"
            onClick={this.handleSubmit}
            size="default">保存</Button>
        </FormItem>


      </Form>
    )
    return formContent

  }
}


const SysLogServerConfig: any = Form.create()(WrappedForm)


@extraConnect(
  state => {
    const effectsLoading = state.loading.effects
    return {
      loading: effectsLoading[`${SYS_CONFIG_SYS_LOG_NAMESPACE}/fetch`] ||
        effectsLoading[`${SYS_CONFIG_SYS_LOG_NAMESPACE}/put`]
    }
  },
  dispatch => {
    return {
      fetch: _ => dispatch({
        type: `${SYS_CONFIG_SYS_LOG_NAMESPACE}/fetch`,
      }),
      put: payload => dispatch({
        type: `${SYS_CONFIG_SYS_LOG_NAMESPACE}/put`
      })
    }
  }
)
export default class extends React.Component<any, any>{
  state = {
    data: {},
    initial: false
  }
  componentDidMount() {
    this.fetchData()
  }
  fetchData = () => {
    this.props.fetch().then(res => this.setState({ data: res, initial: true }))
  }
  onSubmit = payload => {
    this.props.put(payload)
      .then(_ => Message.success("保存成功"))
      .then(this.fetchData)
  }
  render() {

    const { onSubmit } = this
    const { loading } = this.props
    const { data, initial } = this.state
    return (
      <Card
        title={
          <div>
            <Icon type="setting"></Icon> &nbsp;SYS-LOG服务器网络配置&nbsp;&nbsp;
          </div>
        } style={{ marginBottom: "15px" }}>
        <Choose>
          <When condition={initial}>
            <SysLogServerConfig
              onSubmit={onSubmit}
              loading={loading}
              defaultValue={data}>
            </SysLogServerConfig>
          </When>
          <Otherwise>
            <Icon type="loading"></Icon>
          </Otherwise>
        </Choose>
      </Card>
    )
  }
}