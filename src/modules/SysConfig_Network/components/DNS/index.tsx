/**
 * Created by jojo on 2017/10/9.
 */
import {
  DNS_DATAINDEX,
  dnsTextConfig
} from '../../constants'
import * as React from 'react'
import { Input, Row, Col, Button, Tooltip, message as Message, Spin, Switch, Checkbox, Popconfirm } from 'antd'
import { Form, Icon } from 'antd'
import classnames from 'classnames'
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
import { ipReg, portReg } from 'utils/tools'
import extraConnect from 'domainUtils/extraConnect'
import Card from 'domainComponents/Card'
import { SYS_CONFIG_NETWORK_DNS_NAMESPACE } from 'constants/model'
import { When, Otherwise, Choose } from 'components/ControlStatements'
import LoadModuleErrorInfo from 'domainComponents/LoadModuleErrorInfo'




class WrappedForm extends React.Component<any, any> {
  constructor(props) {
    super(props)

  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { form, onSubmit } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onSubmit && onSubmit(values)
    })
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { defaultValue = {}, loading } = this.props
    const formItemLayout = {
      labelCol: {
        span: 3,
      },
      wrapperCol: {
        span: 12,
      },
    }

    const formContent = (
      <Form style={{ width: "800px" }}>
        <FormItem {...formItemLayout}
          colon={false}
          required={true}
          label={<span >
            {"DNS配置"}
          </span>}>
          {getFieldDecorator(DNS_DATAINDEX, {
            initialValue: defaultValue[DNS_DATAINDEX],
            rules: [
              {
                required: true, message: "请输入DNS"
              },
              {
                pattern: ipReg, message: "请输入正确的DNS"
              }
            ]
          })(
            <Input disabled={loading}></Input>
          )}
        </FormItem>
        <FormItem {...formItemLayout}
          label={" "}
          colon={false}>
          <Button type="primary"
            style={{ marginRight: "10px" }}
            loading={loading}
            icon="save"
            onClick={this.handleSubmit}
            size="default">
            保存
          </Button>
        </FormItem>

      </Form>
    )
    return formContent

  }
}

const DNS: any = Form.create()(WrappedForm)



@extraConnect(
  state => {
    const effectsLoading = state.loading.effects
    return {
      loading: effectsLoading[`${SYS_CONFIG_NETWORK_DNS_NAMESPACE}/fetch`] ||
        effectsLoading[`${SYS_CONFIG_NETWORK_DNS_NAMESPACE}/put`]
    }
  },
  dispatch => {
    return {
      fetch: _ => dispatch({
        type: `${SYS_CONFIG_NETWORK_DNS_NAMESPACE}/fetch`,
      }),
      put: payload => dispatch({
        type: `${SYS_CONFIG_NETWORK_DNS_NAMESPACE}/put`,
        payload
      })
    }
  }
)
export default class extends React.Component<any, any>{
  state = {
    data: {},
    initial: false,
    error: false
  }
  componentDidMount() {
    this.fetchData().catch(error => this.setState({ error }))
  }
  fetchData = () => {
    return this.props.fetch()
      .then(res => this.setState({ data: res, initial: true }))
  }
  onSubmit = payload => {
    return this.props.put(payload)
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
            <Icon type="setting"></Icon> &nbsp;DNS认证配置&nbsp;&nbsp;
          </div>
        } style={{ marginBottom: "15px" }}>
        <Choose>
          <When condition={initial}>
            <DNS
              onSubmit={onSubmit}
              loading={loading}
              defaultValue={data}>
            </DNS>
          </When>
          <When condition={this.state.error}>
            <LoadModuleErrorInfo error={this.state.error}></LoadModuleErrorInfo>
          </When>
          <Otherwise>
            <Icon type="loading"></Icon>
          </Otherwise>
        </Choose>
      </Card>
    )
  }
}