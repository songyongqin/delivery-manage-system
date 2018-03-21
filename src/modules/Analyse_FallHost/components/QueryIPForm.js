import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd';
import React from 'react';
import * as tools from '../../../utils/tools';
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
    const { defaultValue = {}, loading = false } = this.props;
    const { ip = "" } = defaultValue;

    return (
      <Form style={{ width: "300px" }}>
        <FormItem required={false}
          style={{ marginBottom: "10px" }}
          label={<span>请输入要搜索的失陷主机IP</span>}>
          {getFieldDecorator('ip', {
            initialValue: ip,
            rules: [
              { pattern: ipReg, message: "请输入有效的ip" }
            ]
          })(
            <Input placeholder="失陷主机搜索"
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
