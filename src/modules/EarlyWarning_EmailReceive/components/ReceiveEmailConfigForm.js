/**
 * Created by jojo on 2017/9/11.
 */
import React from 'react';
import { Input, Row, Col, Button, Tooltip, message as Message, Spin, Switch, Checkbox } from 'antd';
import { Form, Icon } from 'antd';
import { level, textConfig } from '../ConstConfig';
import styles from './ReceiveEmailConfigForm.css';
import classnames from 'classnames';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;


let uuid = 0;


@Form.create()
class WrappedForm extends React.Component {
  remove = (index) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    form.setFieldsValue({
      keys: keys.filter((key, i) => index !== i),
    });
  };

  add = () => {
    uuid++;
    const { form } = this.props;
    const keys = form.getFieldValue('keys');

    const nextKeys = keys.concat([""]);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields((err, values) => {

      if (!err) {
        let payload = {};
        payload.open = values.open ? 1 : 0;
        payload.level = values.level;
        delete values.open
        delete values.level;
        delete values.keys;
        payload.emails = Object.values(values)
        onSubmit && onSubmit(payload);
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { defaultValue = {}, isDark, loading, isAdmin } = this.props;
    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 18 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        sm: { span: 18, offset: 6 },
      },
    };
    getFieldDecorator('keys', { initialValue: defaultValue.emails || [""] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          colon={false}
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel) }
          label={index === 0 ? <span className={isDark ? "lbl-dark" : null}>接受邮箱设置</span> : ''}
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
            <Input disabled={loading || !isAdmin}
              style={{ width: '90%', marginRight: "8px" }} />
            )}
          {
            isAdmin
              ?
              <a style={{ color: "#d73435" }}>
                <Icon
                  type="minus-circle-o"
                  disabled={keys.length === 1}
                  onClick={() => this.remove(index)}
                />
              </a>
              :
              null
          }
        </FormItem>
      );
    });

    const formClasses = classnames({
      [styles["form"]]: true,
      [styles["form-dark"]]: isDark
    })

    const formContent = (
      <Form className={formClasses}>
        <FormItem {...formItemLayout}
          colon={false}
          label={<span className={isDark ? "lbl-dark" : null}>邮件通知</span>}>
          {getFieldDecorator('open', {
            initialValue: defaultValue.open === 1
          })(
            <Switch checkedChildren={"开"}
              unCheckedChildren={"关"}
              disabled={loading || !isAdmin} />
            )}
        </FormItem>
        <FormItem {...formItemLayout}
          colon={false}
          label={<span className={isDark ? "lbl-dark" : null}>威胁级别报警设置</span>}>
          {getFieldDecorator('level', {
            initialValue: defaultValue.level
          })(
            <CheckboxGroup
              disabled={loading || !isAdmin}
              className={classnames({
                [styles["check-box"]]: true,
                ["lbl-dark"]: isDark
              })}
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
        {
          isAdmin
            ?
            <FormItem {...formItemLayoutWithOutLabel}
              colon={false}>
              <Button type="dashed"
                onClick={this.add}
                disabled={loading || !isAdmin}
                style={{ width: '90%' }}>
                <Icon type="plus" /> 添加新的提醒邮箱
            </Button>
            </FormItem>
            :
            null
        }
        {
          isAdmin
            ?
            <FormItem {...formItemLayoutWithOutLabel}
              colon={false}>
              <Button type="primary"
                disabled={loading || !isAdmin}
                icon="save"
                onClick={this.handleSubmit}
                size="large">保存</Button>
            </FormItem>
            :
            null
        }
      </Form>
    )

    return isAdmin
      ?
      formContent
      :
      <Tooltip title="非管理员无法进行修改" trigger={["hover", "click"]}>
        {formContent}
      </Tooltip>
  }
}

export default WrappedForm;
