import React from 'react';
import { Input, Row, Col, Button, Tooltip, message as Message, Spin, Switch, Checkbox } from 'antd';
import { Form, Icon } from 'antd';
import {
  OPEN_DATA_INDEX,
  CONNECT_CLOUD_DATA_INDEX
} from '../../ConstConfig';
import classnames from 'classnames'
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
import { ipReg, portReg } from 'utils/tools.js'


@Form.create()
class WrappedForm extends React.Component {
  remove = (index) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    form.setFieldsValue({
      keys: keys.filter((key, i) => index !== i),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, onSubmit } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      values = { ...values }
      values[OPEN_DATA_INDEX] = values[OPEN_DATA_INDEX] ? 1 : 0
      onSubmit && onSubmit(values)
    });
  };
  ipCheck = (rule, value, callback) => {
    if (ipReg.test(value)) {
      return callback()
    }
    callback("请输入正确的IP")
  }
  portCheck = (rule, value, callback) => {
    if (portReg.test(value)) {
      return callback()
    }
    callback("请输入正确的端口")
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { defaultValue = {}, isDark, loading, isAdmin } = this.props;
    const formItemLayout = {
      labelCol: {
        span: 12,
      },
      wrapperCol: {
        span: 12,
      },
    }

    const lblClasses = classnames({
      ["lbl-dark"]: isDark,
    })

    const formContent = (
      <Form style={{ width: "800px" }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ float: "left", height: "40px", lineHeight: "40px" }}>
            <FormItem
              {...formItemLayout}
              style={{ width: "240px" }}
              colon={false}
              label={<span className={lblClasses}>
                云检测功能
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>}>
              {getFieldDecorator(OPEN_DATA_INDEX, {
                initialValue: defaultValue[OPEN_DATA_INDEX] === 1,
                valuePropName: "checked"
              })(
                <Switch checkedChildren={"开启"}
                  unCheckedChildren={"禁用"}
                  disabled={loading} />
              )}
            </FormItem>
          </div>
          <div style={{ float: "left", height: "40px", lineHeight: "40px" }}>
            <FormItem wrapperCol={{ span: 4 }}
              colon={false}>
              <Button type="primary"
                loading={loading}
                icon="save"
                size="default"
                onClick={this.handleSubmit}
              >保存</Button>
            </FormItem>
          </div>
        </div>

        {
          defaultValue[CONNECT_CLOUD_DATA_INDEX] === 1
            ?
            <p style={{ color: "#00a854" }}>
              设备可连接到云检测服务器，云检测功能正常运行
            </p>
            :
            <p style={{ color: "#f04134" }}>
              设备无法连接到云检测服务器，无法上传数据到云服务器
            </p>
        }



      </Form>
    )
    return formContent

  }
}

export default WrappedForm;
