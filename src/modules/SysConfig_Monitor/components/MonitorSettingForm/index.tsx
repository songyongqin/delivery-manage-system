import * as React from 'react'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd'
import classnames from 'classnames'
import {
  MONITOR_PERIOD_DATA_INDEX,
  MODULE_LIST_DATA_INDEX,
  monitorFormTextConfig
} from '../../ConstConfig'

const periodConfig = {
  0: "不检测",
  1: "每小时",
  24: "每24小时",
  360: "每半个月",
  720: "每月"
}

const FormItem = Form.Item



const formItemLayout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  },
}

@Form.create()
class WrappedForm extends React.Component<any, any> {
  static defaultProps = {
    items: ["web"],
    itemTextConfig: {}
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { onSubmit, form, items } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      delete values["checkedAll"]
      const moduleList = {};
      items.forEach(i => {
        moduleList[i] = values[MODULE_LIST_DATA_INDEX].includes(i) ? 1 : 0
      })
      values[MODULE_LIST_DATA_INDEX] = moduleList;
      values[MONITOR_PERIOD_DATA_INDEX] = parseInt(values[MONITOR_PERIOD_DATA_INDEX])
      onSubmit && onSubmit(values)
    })
  }
  checkAllOnChange = (e) => {
    const { form, items } = this.props;
    const checked = e.target.checked;
    form.setFieldsValue({ [MODULE_LIST_DATA_INDEX]: checked ? items : [] });
  }
  checkedGroupOnChange = (checkedValue) => {
    const { form, items } = this.props;
    const checked = items.length === checkedValue.length;
    form.setFieldsValue({ ["checkedAll"]: checked });
  }
  render() {

    const { getFieldDecorator } = this.props.form;
    const {
      isDark,
      loading,
      defaultValue = {},
      style,
      form,
      items,
      itemTextConfig
    } = this.props;

    const lblClasses = classnames({
      "lbl-dark": isDark
    })

    return (
      <Form style={{
        ...style
      }}>
        <FormItem {...formItemLayout}
          label={<span className={lblClasses}>
            {monitorFormTextConfig[MONITOR_PERIOD_DATA_INDEX]}
          </span>}>
          {getFieldDecorator(MONITOR_PERIOD_DATA_INDEX, {
            initialValue: (defaultValue[MONITOR_PERIOD_DATA_INDEX] + "") || "0"
          })(
            <Select disabled={loading}>
              {
                Object.keys(periodConfig).map((i, index) => (
                  <Select.Option value={i + ""} key={`${index}-option`}>
                    {periodConfig[i]}
                  </Select.Option>
                ))
              }
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout}
          style={{ marginBottom: "10px" }}
          label={<span className={lblClasses}>
            {monitorFormTextConfig[MODULE_LIST_DATA_INDEX]}
          </span>}>
          {getFieldDecorator("checkedAll", {
            initialValue: defaultValue["checkedAll"],
            valuePropName: "checked"
          })(
            <Checkbox onChange={this.checkAllOnChange} disabled={loading}>
              <span className={lblClasses}>全选</span>
            </Checkbox>
          )}
        </FormItem>
        <FormItem {...formItemLayout}
          label={""}>
          {getFieldDecorator(MODULE_LIST_DATA_INDEX, {
            initialValue: defaultValue[MODULE_LIST_DATA_INDEX] || ["one"]
          })(
            <Checkbox.Group onChange={this.checkedGroupOnChange} disabled={loading}>
              {
                items.map((i, index) => (
                  <Col key={`${index}-checkbox`}>
                    <Checkbox value={i}>
                      <span className={lblClasses}>
                        {itemTextConfig[i] || i}
                      </span>
                    </Checkbox>
                  </Col>
                ))
              }
            </Checkbox.Group>
          )}
        </FormItem>
        <FormItem
          style={{
            width: "60px",
            display: "inline-block",
          }}>
          <Button type="primary"
            disabled={loading}
            icon="save"
            onClick={this.handleSubmit}>保存设置</Button>
        </FormItem>
      </Form>
    );
  }
}

export default WrappedForm;