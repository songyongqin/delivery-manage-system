import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd';
import React from 'react';
import * as tools from 'utils/tools';
const { ipReg } = tools

const FormItem = Form.Item;

class QueryForm extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit && this.props.onSubmit(values);
      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const { defaultValue = {}, loading = false, config = {} } = this.props;
    const { placeholder, label, dataIndex, rules = [] } = config;

    return (
      <Form style={{ width: "300px" }}>
        <FormItem required={false}
          style={{ marginBottom: "10px" }}
          label={<span>{label}</span>}>
          {getFieldDecorator(dataIndex, {
            initialValue: defaultValue[dataIndex],
            rules
          })(
            <Input placeholder={placeholder}
              onPressEnter={this.handleSubmit} />
            )}
        </FormItem>
        <Button type="primary"
          size="large"
          icon="search"
          onClick={this.handleSubmit}>搜索</Button>
      </Form>
    );
  }
}

export default Form.create()(QueryForm);
