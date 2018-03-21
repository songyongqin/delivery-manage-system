import * as React from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd'
import classnames from 'classnames'
import VerificationCode from 'components/VerificationCode'
const FormItem = Form.Item
import { COMMON_SUCCESS_STATUS } from 'configs/ConstConfig'
import { VERIFICATION_CODE_DATA_INDEX, USER_PASSWORD_DATA_INDEX, NEW_PASSWORD_DATA_INDEX, USER_ACCOUNT_DATA_INDEX } from 'modules/Login/ConstConfig'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 6,
    },
  },
}

@Form.create()
class WrappedForm extends React.Component<any, any> {
  state = {
    confirmDirty: false,
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { onSubmit, form } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onSubmit && onSubmit(values).then(res => {
        if (res.status !== COMMON_SUCCESS_STATUS) {
          form.setFields({ [VERIFICATION_CODE_DATA_INDEX]: { value: "" } })
          form.setFields({ [USER_PASSWORD_DATA_INDEX]: { value: "" } })
        }
      })
    })
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;

    if (value && value !== form.getFieldValue(NEW_PASSWORD_DATA_INDEX)) {
      callback('请确定两次输入的新密码一致')
    } else {
      callback()
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    if (value && value === form.getFieldValue(USER_PASSWORD_DATA_INDEX)) {
      callback('新密码不能和旧密码一致')
    } else {
      callback()
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, isDark, status, verificationCode } = this.props;


    return (
      <Form >
        <FormItem
          {...formItemLayout}
          colon={false}
          label={<span>原密码</span>}
          hasFeedback>
          {getFieldDecorator(USER_PASSWORD_DATA_INDEX, {
            rules: [
              {
                required: true, message: '请输入原密码',
              },
              {
                max: 128, message: "请输入少于或等于128位的密码"
              }
            ],
          })(
            <Input disabled={loading} type="password" />
            )}
        </FormItem>
        <FormItem
          colon={false}
          {...formItemLayout}
          label={<span>新密码</span>}
          hasFeedback
        >
          {getFieldDecorator(NEW_PASSWORD_DATA_INDEX, {
            rules: [
              // {
              //   validator: this.checkConfirm,
              // },
              {
                required: true, message: '请输入新密码',
              },
              {
                max: 128, message: "请输入少于或等于128位的密码"
              }
            ],
          })(
            <Input disabled={loading}
              type="password" />
            )}
        </FormItem>
        <FormItem
          colon={false}
          {...formItemLayout}
          label={<span>确认新密码</span>}
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true, message: '请再次确新密码',
              },
              {
                validator: this.checkPassword,
              },
              {
                max: 128, message: "请输入少于或等于128位的密码"
              }
            ],
          })(
            <Input type="password"
              disabled={loading}
              onBlur={this.handleConfirmBlur}
              onPressEnter={this.handleSubmit} />
            )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary"
            loading={loading}
            onClick={this.handleSubmit}
            style={{ marginTop: "10px" }}>
            确定
          </Button>
        </FormItem>
      </Form>
    );
  }
}


export default WrappedForm