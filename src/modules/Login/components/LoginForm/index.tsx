import * as React from 'react'

import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd'
import VerificationCode from 'components/VerificationCode'

import classnames from 'classnames'

const styles = require("./styles.less")
const FormItem = Form.Item
import isSuccess from 'domainUtils/isSuccess'

import {
  VERIFICATION_CODE_DATA_INDEX,
  USER_PASSWORD_DATA_INDEX,
  USER_ACCOUNT_DATA_INDEX
} from 'constants/user'


class WrappedForm extends React.Component<any, any> {
  handleSubmit = (e) => {
    e.preventDefault()
    const { onSubmit, form } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      onSubmit && onSubmit(values)
        .then(res => {
          if (isSuccess(res)) {
            form.setFields({ [USER_ACCOUNT_DATA_INDEX]: { value: "" } })
          }
          form.setFields({ [VERIFICATION_CODE_DATA_INDEX]: { value: "" } })
          form.setFields({ [USER_PASSWORD_DATA_INDEX]: { value: "" } })
        })
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, isDark, status, verificationCode } = this.props;

    const formClasses = classnames({
      [styles["form"]]: true,
    })

    return (
      <Form className={formClasses}>
        <FormItem required={false}>
          {getFieldDecorator(USER_ACCOUNT_DATA_INDEX, {
            rules: [{ required: true, message: '请输入您的账号' }],
          })(
            <Input disabled={loading}
              prefix={<Icon type="user" style={{ fontSize: 13 }} />}
              autoComplete="off"
              className={styles["input"]}
              placeholder="用户名" />
          )}
        </FormItem>
        <FormItem required={false}>
          {getFieldDecorator(USER_PASSWORD_DATA_INDEX, {
            rules: [{ required: true, message: '请输入您的密码' }],
          })(
            <Input className={styles["input"]}
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              type="password"
              autoComplete="off"
              disabled={loading}
              onPressEnter={this.handleSubmit}
              placeholder="密码" />
          )}
        </FormItem>
        <div style={{ overflow: "hidden" }}>
          <div style={{ width: "170px", marginRight: "10px", float: "left" }}>
            <FormItem required={false} style={{ width: "100%" }}>
              {getFieldDecorator(VERIFICATION_CODE_DATA_INDEX, {
                rules: [{ required: true, message: '请输入右侧的验证码' }],
              })(
                <Input className={styles["input"]}
                  style={{ width: "160px" }}
                  autoComplete="off"
                  disabled={loading}
                  onPressEnter={this.handleSubmit}
                  placeholder="验证码" />
              )}
            </FormItem>
          </div>
          <div style={{ float: "left" }}>
            <VerificationCode
              onClick={this.props.requestCode}
              key={`${verificationCode}-code`}
              value={verificationCode}
              isDark={isDark}>
            </VerificationCode>
          </div>
        </div>
        <FormItem>
          <Button type="primary"
            className={styles["btn"]}
            loading={loading}
            onClick={this.handleSubmit}
            style={{ width: "100%", marginTop: "10px" }}>
            SIGN IN
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const FinalForm = Form.create()(WrappedForm)

export default class extends React.Component<any, any>{
  render() {
    return <FinalForm {...this.props}></FinalForm>
  }
}