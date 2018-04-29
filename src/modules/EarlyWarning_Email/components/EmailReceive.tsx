import * as React from 'react'
import { connect } from 'dva'
import classnames from 'classnames'
// import { textConfig, NAMESPACE } from './ConstConfig'
import Spin from 'domainComponents/Spin'
import { EARLY_WARNING_EMAIL_RECEIVE_NAMESPACE } from 'constants/model'
import * as tools from 'utils'
import extraConnect from 'domainUtils/extraConnect'
import { Choose, When } from 'components/ControlStatements'
import { Input, Row, Col, Button, Tooltip, message as Message, Switch, Checkbox, Form, Icon } from 'antd'
import { level, textConfig } from '../ConstConfig'
import styles from './ReceiveEmailConfigForm.css'
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
import { omit } from 'utils'

function isPositiveInteger(s) {//是否为正整数
  let re = /^[0-9]+$/;
  return re.test(s)
}


let uuid = 0


class ReceiveForm extends React.Component<any, any> {
  static defaultProps = {
    defaultValue: {
      open: 0,
      level: [],

    }
  }
  remove = (index) => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    form.setFieldsValue({
      keys: keys.filter((key, i) => index !== i),
    })
  }

  add = () => {
    uuid++
    const { form } = this.props;
    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat([""])
    form.setFieldsValue({
      keys: nextKeys,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { form, onSubmit } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        let payload = {
          open: values.open ? 1 : 0,
          level: values.level,
          emails: []
        };
        values = omit(["open", "level", "keys"], values)
        payload.emails = Object.values(values)
        onSubmit && onSubmit(payload)
      }
    })
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { defaultValue = {}, isDark, loading, readonly } = this.props;
    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 18 },
      },
    }
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        sm: { span: 18, offset: 6 },
      },
    }
    // console.info(defaultValue);
    getFieldDecorator('keys', { initialValue: defaultValue.emails || [""] });
    const keys = getFieldValue('keys')
    const formItems = keys.map((k, index) => {
      // let defaultValue=isPositiveInteger(k)?"":k;
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? <span className={isDark ? "lbl-dark" : null}>接收邮箱设置</span> : ''}
          required={false}
          key={`${index}-email`}
        >
          {getFieldDecorator(`remindEmail-${index}`, {
            initialValue: k,
            rules: [
              {
                required: true, message: '邮箱不能为空'
              },
              {
                type: 'email', message: '请输入正确的邮箱格式!',
              }
            ],
          })(
            <Input style={{ width: '90%', marginRight: "8px" }} disabled={readonly} />
          )}
          {
            readonly
              ?
              null
              :
              <Icon
                type="minus-circle-o"
                onClick={() => this.remove(index)}
              />
          }

        </FormItem>
      )
    })
    return (
      <Form style={{ maxWidth: "600px", paddingBottom: "300px" }}>
        <FormItem {...formItemLayout}
          label={<span className={isDark ? "lbl-dark" : null}>邮件通知</span>}>
          {getFieldDecorator('open', {
            valuePropName: 'checked',
            initialValue: defaultValue.open === 1
          })(
            <Switch
              disabled={readonly}
              checkedChildren={"开"}
              unCheckedChildren={"关"} />
          )}
        </FormItem>
        <FormItem {...formItemLayout}
          label={<span className={isDark ? "lbl-dark" : null}>威胁等级报警设置</span>}>
          {getFieldDecorator('level', {
            valuePropName: 'checked',
            initialValue: defaultValue.level[0]
          })(
            <CheckboxGroup
              disabled={readonly}
              className={classnames({
              })}
              key={`${loading}-check-box-group`}
              defaultValue={defaultValue.level}
              options={level.map(k => {
                return {
                  value: k,
                  label: textConfig.form.receive.level[k]
                }
              })} >
            </CheckboxGroup>

          )}
        </FormItem>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed"
            disabled={readonly}
            onClick={this.add}
            style={{ width: '90%' }}>
            <Icon type="plus" /> 添加新的提醒邮箱
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary"
            loading={loading}
            icon="save"
            disabled={readonly}
            onClick={this.handleSubmit}>
            保存设置
          </Button>
        </FormItem>
      </Form>
    );
  }
}


const WrappedReceiveForm: any = Form.create()(ReceiveForm)


function mapStateToProps(state) {
  const effectsLoading = state.loading.effects
  return {
    loading: effectsLoading[`${EARLY_WARNING_EMAIL_RECEIVE_NAMESPACE}/put`] ||
      effectsLoading[`${EARLY_WARNING_EMAIL_RECEIVE_NAMESPACE}/fetch`],

  }
}

function mapDispatchToProps(dispatch) {
  return {
    put: payload => dispatch({
      type: `${EARLY_WARNING_EMAIL_RECEIVE_NAMESPACE}/put`,
      payload
    }),
    fetch: payload => dispatch({
      type: `${EARLY_WARNING_EMAIL_RECEIVE_NAMESPACE}/fetch`,
      payload
    })
  }
}

@extraConnect(mapStateToProps, mapDispatchToProps)
export default class EmailReceive extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        open: 0,
        level: [],
      },
      lastReqTime: 0
    }
  }
  componentDidMount() {
    this.fetchData()
  }
  fetchData = () => {
    this.props.fetch().then(res => {
      this.setState({
        data: res,
        lastReqTime: new Date().getTime()
      })
    })
  }
  put = payload => this.props.put(payload)
    .then(_ => {
      Message.success("保存设置成功")
    })
  render() {

    const { loading, readonly } = this.props

    return (
      <Spin spinning={loading}>
        <WrappedReceiveForm
          readonly={readonly}
          onSubmit={this.put}
          key={`receive-from-${this.state.lastReqTime}`}
          defaultValue={this.state.data} />
      </Spin>
    )
  }
}




