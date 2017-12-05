import React from 'react';
import { Input, Row, Col, Button, Tooltip, message as Message, Spin, Switch, Checkbox, Popconfirm } from 'antd';
import { Form, Icon } from 'antd';

import classnames from 'classnames';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
import { ipReg, portReg } from '../../../../utils/tools.js'
import {
  AUTH_USER_ACCOUNT, AUTH_PASSWORD, IS_CONNECT
} from '../../ConstConfig'


const labelConfig = {
  [AUTH_USER_ACCOUNT]: "用户名",
  [AUTH_PASSWORD]: "密码"
}


@Form.create()
class WrappedForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      connect: null
    }
  }
  handleConnect = (e) => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      onSubmit && onSubmit({
        values,
        [IS_CONNECT]: 1,
      })
        .then(result => this.setState({ connect: 1 }))
        .then(result => Message.success("802.1x协议上网认证配置成功", 3))

    })
  }
  handleDisConnect = (e) => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      onSubmit && onSubmit({
        values,
        [IS_CONNECT]: 0,
      })
        .then(result => this.setState({ connect: 0 }))
    })
  }
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

    const connect = this.state.connect !== null ? this.state.connect : defaultValue[IS_CONNECT];



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
            style={{ marginRight: "10px" }}
            disabled={connect === 1}
            icon="link"
            onClick={this.handleConnect}
            size="large">
            {
              connect === 1
                ?
                "连接中"
                :
                "连接"
            }
          </Button>
          <Popconfirm onConfirm={this.handleDisConnect} title="将断开802.1x协议上网认证功能">
            <Button type="primary"
              disabled={connect !== 1}
              icon="disconnect"

              size="large">
              断开
          </Button>
          </Popconfirm>
        </FormItem>

      </Form>
    )
    return formContent

  }
}

export default WrappedForm;