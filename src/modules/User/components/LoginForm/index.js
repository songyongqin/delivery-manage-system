/**
 * Created by jojo on 2017/9/1.
 */
import React from 'react';
import styles from './styles.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import classnames from 'classnames';
const FormItem = Form.Item;


@Form.create()
class WrappedForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit&&this.props.onSubmit(values)
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {loading,isDark,status}=this.props;

    const formClasses=classnames({
      [styles["form"]]:true,
      [styles["form-dark"]]:isDark
    })

    return (
      <Form className={formClasses}>
        <FormItem required={false}>
          {getFieldDecorator('userAccount', {
            rules: [{ required: true, message: '不能为空' }],
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
        <FormItem>
          <Button type="primary"
                  className={styles["btn"]}
                  loading={loading}
                  onClick={this.handleSubmit}
                  style={{width:"100%",marginTop:"30px"}}>
            SIGN IN
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default WrappedForm;
