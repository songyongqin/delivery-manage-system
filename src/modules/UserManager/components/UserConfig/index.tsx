/**
 * Created by jojo on 2017/9/5.
 */
import * as  React from 'react'
import { InputNumber, Button, Form, Icon, Tooltip, Input, message as Message } from 'antd'
import styles from './styles.css'
const FormItem = Form.Item
import extraConnect from 'domainUtils/extraConnect'
import Card from 'domainComponents/Card'
import { USER_MANAGER_NAMESPACE } from 'constants/model'
import { When, Choose, Otherwise } from 'components/ControlStatements'



class MaxAuthTime extends React.Component<any, any> {
  handleSubmit = (e) => {
    e.preventDefault()
    const { onSubmit, form } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onSubmit && onSubmit(values)
    })
  }
  checkNumber = (rule, value, callback) => {
    if (value > (10e6 - 1)) {
      return callback("最大次数不得超过9,999,999")
    }
    if (value >= 1) {
      return callback()
    }
    callback("必须是大于等于1的正整数")
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { defaultValue = {}, loading } = this.props
    return (
      <Form layout="inline">
        <FormItem
          colon={false}
          label={<span>
            登录尝试次数设置&nbsp;
            <Tooltip title={"当用户登录失败达到该次数时，用户将被冻结无法再登录，管理员可执行解除用户冻结操作"}>
              <a>
                <Icon type="question-circle-o" style={{ color: "#108ee9" }} />
              </a>
            </Tooltip>
          </span>}
          required={false}>
          {getFieldDecorator("maxAuthTimes", {
            initialValue: defaultValue["maxAuthTimes"],
            rules: [{ required: true, message: '请输入登录尝试次数' }, { validator: this.checkNumber }],
          })(
            <InputNumber disabled={loading} style={{ width: "200px" }} />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary"
            className={styles["btn"]}
            loading={loading}
            icon={"save"}
            onClick={this.handleSubmit}>
            确定
          </Button>
        </FormItem>
      </Form>
    )
  }
}


const MaxAuthTimeForm: any = Form.create()(MaxAuthTime)

@extraConnect(
  state => {
    return {
      putLoading: state.loading.effects[`${USER_MANAGER_NAMESPACE}/putUserConfig`]
    }
  },
  dispatch => {
    return {
      fetch: _ => dispatch({
        type: `${USER_MANAGER_NAMESPACE}/fetchUserConfig`
      }),
      put: payload => dispatch({
        type: `${USER_MANAGER_NAMESPACE}/putUserConfig`,
        payload
      })
    }
  }
)
export default class UserConfig extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      initial: false
    }
  }
  componentDidMount() {
    this.fetchData()
  }
  fetchData = () => {
    this.props.fetch()
      .then(res => this.setState({ data: res }))
      .then(_ => this.setState({ initial: true }))
  }
  onSubmit = payload => {
    this.props.put(payload)
      .then(_ => Message.success("修改成功"))
  }
  render() {
    return (
      <Card title={<div><Icon type="setting"></Icon>&nbsp;用户相关设置</div>}>
        <Choose>
          <When condition={this.state.initial}>
            <MaxAuthTimeForm
              loading={this.props.putLoading}
              onSubmit={this.onSubmit}
              defaultValue={this.state.data}>
            </MaxAuthTimeForm>
          </When>
          <Otherwise>
            <Icon type="loading"></Icon>
          </Otherwise>
        </Choose>
      </Card>
    )
  }
}