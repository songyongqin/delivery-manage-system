import React from 'react';
import { Input, Row, Col, Button, Tooltip, message as Message, Spin, Switch, Checkbox } from 'antd';
import { Form, Icon } from 'antd';

import classnames from 'classnames';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
import { ipReg, portReg } from '../../../../utils/tools.js'
import {
  AUTH_USER_ACCOUNT, AUTH_PASSWORD
} from '../../ConstConfig'


const labelConfig = {
  [AUTH_USER_ACCOUNT]: "用户名",
  [AUTH_PASSWORD]: "密码"
}


@Form.create()
class WrappedForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      onSubmit && onSubmit(values)
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { defaultValue = {}, isDark, loading, isAdmin } = this.props;
    const formItemLayout = {
      labelCol: {
        span: 3,
      },
      wrapperCol: {
        span: 12,
      },
    };

    const lblClasses = classnames({
      ["lbl-dark"]: isDark,
    })



    const formContent = (
      <Form style={{ width: "800px" }}>
        <FormItem {...formItemLayout}
          colon={false}
          required={true}
          label={<span className={lblClasses}>
            {labelConfig[AUTH_USER_ACCOUNT]}
          </span>}>
          {getFieldDecorator(AUTH_USER_ACCOUNT, {
            initialValue: defaultValue[AUTH_USER_ACCOUNT],
            rules: [
              {
                required: true, message: "请输入用户名"
              }
            ]
          })(
            <Input disabled={loading}></Input>
            )}
        </FormItem>
        <FormItem {...formItemLayout}
          colon={false}
          required={true}
          label={<span className={lblClasses}>
            {labelConfig[AUTH_PASSWORD]}
          </span>}>
          {getFieldDecorator(AUTH_PASSWORD, {
            initialValue: defaultValue[AUTH_PASSWORD],
            rules: [
              {
                required: true, message: "请输入密码"
              }
            ]
          })(
            <Input disabled={loading} type="password"></Input>
            )}
        </FormItem>
        <FormItem {...formItemLayout}
          label={" "}
          colon={false}>
          <Button type="primary"
            disabled={loading}
            icon="save"
            onClick={this.handleSubmit}
            size="large">保存</Button>
        </FormItem>
      </Form>
    )
    return formContent

  }
}

export default WrappedForm;