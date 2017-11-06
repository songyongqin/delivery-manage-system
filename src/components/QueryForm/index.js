import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd';
import React from 'react';
import styles from './styles.css';
const FormItem = Form.Item;

class QueryForm extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (this.props.loading) {
        return;
      }

      if (!err) {
        this.props.onSubmit && this.props.onSubmit(values);
      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const { defaultValue = {}, loading = false, textConfig = {}, style = {}, keyConfig = "value" } = this.props;
    const { value = "" } = defaultValue;

    return (
      <Form style={{ width: "300px", ...style }} layout="inline">
        <FormItem required={false}
          className={styles["input-item"]}
          style={{
            margin: "0",
            width: "calc(100% - 95px)"
          }}>
          {getFieldDecorator(keyConfig, {
            initialValue: value,

          })(
            <Input placeholder={textConfig["placeholder"]}
              style={{ width: "100%" }}
              onPressEnter={this.handleSubmit} />
            )}
        </FormItem>
        <Button
          type="primary"
          size="large"
          icon="search"
          onClick={this.handleSubmit}>{textConfig["button"] || "搜索"}</Button>
      </Form>
    );
  }
}

export default Form.create()(QueryForm);
