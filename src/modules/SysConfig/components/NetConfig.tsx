
/**
 * Created by jojo on 2017/10/9.
 */
import {
  // dnsTextConfig
} from '../ConstConfig'
import * as React from 'react'
import { Input, Row, Col, Button, Tooltip, message as Message, Spin, Switch, Checkbox, Popconfirm } from 'antd'
import { Form, Icon,} from 'antd'
import classnames from 'classnames'
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
import { ipReg, portReg } from 'utils/tools'
import extraConnect from 'domainUtils/extraConnect'
import Card from 'domainComponents/Card'
import { CONFIG_SYS_CONFIG_EXPORT_NET_NAMESPACE } from 'constants/model'
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
            {"IP"}
          </span>}>
          {getFieldDecorator('ip', {
            initialValue: defaultValue['ip'],
            rules: [
              {
                required: true, message: "请填写正确的IP地址！"
              },
              {
                pattern: ipReg, message: "请填写正确的IP地址！"
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

const NET: any = Form.create()(WrappedForm)



@extraConnect(
  state => {
    const effectsLoading = state.loading.effects
    return {
      loading: effectsLoading[`${CONFIG_SYS_CONFIG_EXPORT_NET_NAMESPACE}/get`] ||
        effectsLoading[`${CONFIG_SYS_CONFIG_EXPORT_NET_NAMESPACE}/post`]
    }
  },
  dispatch => {
    return {
      fetch: _ => dispatch({
        type: `${CONFIG_SYS_CONFIG_EXPORT_NET_NAMESPACE}/get`,
      }),
      post: payload => dispatch({
        type: `${CONFIG_SYS_CONFIG_EXPORT_NET_NAMESPACE}/post`,
        payload
      })
    }
  }
)
export default class extends React.Component<any, any>{
  state = {
    data: {},
    initial: false,
    error: false,
    keys:0
  }
  componentDidMount() {
    this.fetchData().catch(error => this.setState({ error }))
  }
  fetchData = () => {
    return this.props.fetch()
      .then(res => this.setState({ data: res, initial: true, keys: +new Date() }))
  }
  onSubmit = payload => {
    return this.props.post(payload)
      .then(_ =>{
        this.fetchData()
        Message.success("内网出口IP设置成功！")
      })
      // .catch()
  }
  render() {

    const { onSubmit } = this
    const { loading } = this.props
    const { data, initial, keys } = this.state
    return (
      <Card
        title={
          <div>
            内网出口IP地址设置&nbsp;&nbsp;
            <Tooltip title='成功设置内网出口IP后，安全态势界面展示的所有内网IP将转换成该IP进行展示' >
              <Icon type="exclamation-circle-o" />
            </Tooltip>
          </div>
        } style={{ marginBottom: "15px" }}>
        <Choose>
          <When condition={initial}>
            <NET
              onSubmit={onSubmit}
              loading={loading}
              defaultValue={data}
              key={ keys }>
            </NET>
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