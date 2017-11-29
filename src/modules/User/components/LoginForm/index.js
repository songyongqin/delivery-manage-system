/**
 * Created by jojo on 2017/9/1.
 */
import React from 'react';
import styles from './styles.css';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import classnames from 'classnames';
import VerificationCode from 'components/VerificationCode'

const FormItem = Form.Item;


@Form.create()
class WrappedForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit && this.props.onSubmit(values)
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, isDark, status, verificationCode } = this.props;

    const formClasses = classnames({
      [styles["form"]]: true,
      [styles["form-dark"]]: isDark
    })

    return (
      <Form className={formClasses}>
        <FormItem required={false}>
          {getFieldDecorator('userAccount', {
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
          {getFieldDecorator('userPassword', {
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
              {getFieldDecorator('verificationCode', {
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

export default WrappedForm;
