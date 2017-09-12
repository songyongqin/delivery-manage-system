/**
 * Created by jojo on 2017/9/11.
 */
import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import styles from './ModifyPasswordForm.css';
import classnames from 'classnames';
const FormItem = Form.Item;


@Form.create()
class WrappedForm extends React.Component {
  state = {
    confirmDirty: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const {onSubmit,form}=this.props;
    form.validateFieldsAndScroll((err, values) => {

      if (err) {
        return
      }

      onSubmit&&onSubmit({
        userAccount:values.userAccount,
        userPassword:values.userPassword
      });

    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;

    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if(value&&value===form.getFieldValue("userPassword")) {
      callback('新密码不能和旧密码一致');
    }

    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const {isDark,loading}=this.props;
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
    };

    const lblClasses=classnames({
      [styles["lbl-dark"]]:isDark
    })


    return (
      <Form >
        <FormItem
          {...formItemLayout}
          colon={false}
          label={<span className={lblClasses}>原密码</span>}
          hasFeedback
        >
          {getFieldDecorator('userPassword', {
            rules: [
              {
                required: true, message: '密码不能为空',
              },
              // {
              //   max:12,message:"长度必须在6-12之间"
              // },
              // {
              //   min:6,message:"长度必须在6-12之间"
              // }
            ],
          })(
            <Input disabled={loading} type="password"/>
          )}
        </FormItem>
        <FormItem
          colon={false}
          {...formItemLayout}
          label={<span className={lblClasses}>新密码</span>}
          hasFeedback
        >
          {getFieldDecorator('newPassword', {
            rules: [
              {
                required: true, message: '密码不能为空',
              },
              {
                max:12,message:"长度必须在6-12之间"
              },
              {
                min:6,message:"长度必须在6-12之间"
              },
              {
                validator: this.checkConfirm,
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
          label={<span className={lblClasses}>确认新密码</span>}
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请再次确密码',
            }, {
              validator: this.checkPassword,
            }],
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
                  icon="edit"
                  onClick={this.handleSubmit}>修改</Button>
        </FormItem>
      </Form>
    );
  }
}

export default WrappedForm;
