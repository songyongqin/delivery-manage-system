import * as React from 'react'
import { Input, Row, Col, Button, Tooltip, message as Message, Spin, Switch, Checkbox, Popconfirm } from 'antd'
import { Form, Icon } from 'antd'
import classnames from 'classnames'
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
import { ipReg, portReg } from 'utils/tools.js'
import {
  AUTH_USER_ACCOUNT, AUTH_PASSWORD, IS_CONNECT
} from '../../constants'
import extraConnect from 'domainUtils/extraConnect'
import Card from 'domainComponents/Card'
import { SYS_CONFIG_NETWORK_AUTH_NAMESPACE } from 'constants/model'
import { When, Otherwise, Choose } from 'components/ControlStatements'


const labelConfig = {
  [AUTH_USER_ACCOUNT]: "用户名",
  [AUTH_PASSWORD]: "密码"
}


class WrappedForm extends React.Component<any, any> {
  constructor(props) {
    super(props)

    this.state = {
      connect: null,
      loading: false
    }
  }
  handleConnect = (e) => {
    e.preventDefault()
    const { form, onSubmit } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      this.setState({
        loading: true
      })

      onSubmit && onSubmit({
        values,
        [IS_CONNECT]: 1,
      })
        .then(result => this.setState({ connect: 1 }))
        .then(_ => this.setState({
          loading: false
        }))

    })
  }
  handleDisConnect = (e) => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      this.setState({
        loading: true
      })

      onSubmit && onSubmit({
        values,
        [IS_CONNECT]: 0,
      })
        .then(result => this.setState({ connect: 0 }))
        .then(_ => this.setState({
          loading: false
        }))
    })
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { defaultValue = {}, isDark, isAdmin } = this.props
    const { loading } = this.state
    const formItemLayout = {
      labelCol: {
        span: 3,
      },
      wrapperCol: {
        span: 12,
      },
    }

    const connect = this.state.connect !== null ? this.state.connect : defaultValue[IS_CONNECT]

    const formContent = (
      <Form style={{ width: "800px" }}>
        <FormItem {...formItemLayout}
          colon={false}
          required={true}
          label={<span >
            {labelConfig[AUTH_USER_ACCOUNT]}
          </span>}>
          {getFieldDecorator(AUTH_USER_ACCOUNT, {
            initialValue: defaultValue[AUTH_USER_ACCOUNT],
            rules: [
              {
                required: true, message: "请输入用户名"
              }
            ]
          })(
            <Input disabled={loading}></Input>
          )}
        </FormItem>
        <FormItem {...formItemLayout}
          colon={false}
          required={true}
          label={<span >
            {labelConfig[AUTH_PASSWORD]}
          </span>}>
          {getFieldDecorator(AUTH_PASSWORD, {
            initialValue: defaultValue[AUTH_PASSWORD],
            rules: [
              {
                required: true, message: "请输入密码"
              }
            ]
          })(
            <Input disabled={loading} type="password"></Input>
          )}
        </FormItem>
        <FormItem {...formItemLayout}
          label={" "}
          colon={false}>
          <Button type="primary"
            style={{ marginRight: "10px" }}
            loading={loading && connect !== 1}
            disabled={connect === 1}
            icon="link"
            onClick={this.handleConnect}
            size="default">
            {
              connect === 1
                ?
                "连接中"
                :
                "连接"
            }
          </Button>
          <Popconfirm onConfirm={this.handleDisConnect} title="将断开802.1x协议上网认证功能">
            <Button type="primary"
              loading={loading && connect === 1}
              disabled={connect !== 1}
              icon="disconnect"
              size="default">
              断开
          </Button>
          </Popconfirm>
        </FormItem>

      </Form>
    )
    return formContent

  }
}

const NetWorkAuth: any = Form.create()(WrappedForm)



@extraConnect(
  state => {
    const effectsLoading = state.loading.effects
    return {
      loading: effectsLoading[`${SYS_CONFIG_NETWORK_AUTH_NAMESPACE}/fetch`] ||
        effectsLoading[`${SYS_CONFIG_NETWORK_AUTH_NAMESPACE}/put`]
    }
  },
  dispatch => {
    return {
      fetch: _ => dispatch({
        type: `${SYS_CONFIG_NETWORK_AUTH_NAMESPACE}/fetch`,
      }),
      put: payload => dispatch({
        type: `${SYS_CONFIG_NETWORK_AUTH_NAMESPACE}/put`
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
    return this.props.put(payload)
      .then(_ => Message.success("802.1x协议上网认证配置成功"))
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
            <Icon type="setting"></Icon> &nbsp;802.1x认证配置&nbsp;&nbsp;
            <Tooltip title="此配置适用于需要进行802.1x协议端口上网认证的网络环境，需输入认证的账号名和密码">
              <a style={{ color: "#108ee9" }}>
                <Icon type="question-circle-o" />
              </a>
            </Tooltip>
          </div>
        } style={{ marginBottom: "15px" }}>
        <Choose>
          <When condition={initial}>
            <NetWorkAuth
              onSubmit={onSubmit}
              loading={loading}
              defaultValue={data}>
            </NetWorkAuth>
          </When>
          <Otherwise>
            <Icon type="loading"></Icon>
          </Otherwise>
        </Choose>
      </Card>
    )
  }
}