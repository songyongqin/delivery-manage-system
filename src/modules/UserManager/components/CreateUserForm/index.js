/**
 * Created by jojo on 2017/9/8.
 */

import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import styles from './styles.css';
import classnames from 'classnames';
const FormItem = Form.Item;


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
    if (value && value !== form.getFieldValue('userPassword')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const {isDark,loading}=this.props;


    const lblClasses=classnames({
      [styles["lbl-dark"]]:isDark
    })

    const commonProps={...formItemLayout,colon:false,hasFeedback:true}

    const items=[
      {
        props:{
          ...commonProps,
          label:<span className={lblClasses}>用户名称</span>
        },
        filed:{
          name:"userAccount",
          rules:[
            {
              required: true, message: '用户账号不能为空',
            },
            {
              pattern:/^[a-zA-Z0-9]{6,12}$/,message:"长度必须在6-12之间 只能由大小写字母和数字组成"
            }
          ]
        },
        component:<Input disabled={loading}/>
      },
      {
        props:{
          ...commonProps,
          label:<span className={lblClasses}>用户密码</span>
        },
        filed:{
          name:"userPassword",
          rules:[
            {
              required: true, message: '密码不能为空',
            },
            {
              pattern:/^[a-zA-Z0-9]{6,12}$/,message:"长度必须在6-12之间 只能由大小写字母和数字组成"
            }
          ]
        },
        component:<Input disabled={loading}
                          type="password" />
      },
      {
        props:{
          ...commonProps,
          label:<span className={lblClasses}>确认密码</span>
        },
        filed:{
          name:"confirm",
          rules: [
            {
              required: true, message: '请再次确密码',
            },
            {
              validator: this.checkPassword,
            }
          ],
        },
        component:<Input type="password"
                          disabled={loading}
                          onBlur={this.handleConfirmBlur}
                          onPressEnter={this.handleSubmit} />
      }
    ]


    return (
      <Form >
        {
          items.map(i=><FormItem key={i.filed.name} {...i.props}>
            {
              getFieldDecorator(i.filed.name,{rules:i.filed.rules})(i.component)
            }
          </FormItem>)
        }
        <FormItem {...tailFormItemLayout}>
          <Button type="primary"
                  loading={loading}
                  icon="plus"
                  onClick={this.handleSubmit}>添加</Button>
        </FormItem>
      </Form>
    );
  }
}

export default WrappedForm;
