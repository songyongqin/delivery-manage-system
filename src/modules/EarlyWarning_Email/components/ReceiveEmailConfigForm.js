/**
 * Created by jojo on 2017/9/11.
 */
import React from 'react';
import { Input, Row, Col, Button, Tooltip, message as Message, Spin, Switch, Checkbox } from 'antd';
import { Form, Icon } from 'antd';
import { level, textConfig } from '../ConstConfig';
import styles from './ReceiveEmailConfigForm.css';
import classnames from 'classnames';
import { WithDefaultValueHandle } from '../../../components/HOSComponents/index'
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

function isPositiveInteger(s) {//是否为正整数
  let re = /^[0-9]+$/;
  return re.test(s)
}
let uuid = 0;


@WithDefaultValueHandle
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
    const { form, onConfirm } = this.props;
    form.validateFields((err, values) => {

      if (!err) {
        let payload = {};
        payload.open = values.open ? 1 : 0;
        payload.level = values.level;
        delete values.open
        delete values.level;
        payload.emails = Object.values(values)
        console.info(payload);
        onConfirm && onConfirm(payload);
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { defaultValue = {}, isDark, loading } = this.props;
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
    // console.info(defaultValue);
    getFieldDecorator('keys', { initialValue: defaultValue.emails || [""] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      // let defaultValue=isPositiveInteger(k)?"":k;
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel) }
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
            <Input style={{ width: '90%', marginRight: "8px" }} />
            )}
          <Icon
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(index)}
          />
        </FormItem>
      );
    });
    return (
      <Form style={{ maxWidth: "600px", paddingBottom: "300px" }}>
        <FormItem {...formItemLayout}
          label={<span className={isDark ? "lbl-dark" : null}>邮件通知</span>}>
          {getFieldDecorator('open', {
            valuePropName: 'checked',
            initialValue: defaultValue.open === 1
          })(
            <Switch checkedChildren={"开"}
              unCheckedChildren={"关"} />
            )}
        </FormItem>
        <FormItem {...formItemLayout}
          label={<span className={isDark ? "lbl-dark" : null}>威胁等级报警设置</span>}>
          {getFieldDecorator('level', {
            valuePropName: 'checked',
            initialOption: defaultValue.level
          })(
            <CheckboxGroup
              className={classnames({
                [styles["check-box"]]: true,
                ["lbl-dark"]: isDark
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
            onClick={this.add}
            style={{ width: '90%' }}>
            <Icon type="plus" /> 添加新的提醒邮箱
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary"
            loading={loading}
            onClick={this.handleSubmit}
            size="large">保存设置</Button>
        </FormItem>
      </Form>
    );
  }
}

export default WrappedForm;
