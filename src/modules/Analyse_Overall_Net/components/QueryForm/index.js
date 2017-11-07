import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd';
import React from 'react';
import styles from './styles.css';
const FormItem = Form.Item;
import classnames from 'classnames';


const pageSizeRange = [10, 20, 30, 50];

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
      values.limit = parseInt(values.limit)
      if (!err) {
        this.props.onSubmit && this.props.onSubmit(values);
      }
    });
  };
  onPageSizeChange = value => {
    const { onSubmit } = this.props;
    onSubmit && onSubmit({
      limit: parseInt(value)
    })
  }
  render() {

    const { getFieldDecorator } = this.props.form;
    const { defaultValue = {}, loading = false, textConfig = {}, style = {}, keyConfig = "value", isDark } = this.props;
    const { value = "" } = defaultValue;
    const lblClasses = classnames({
      ["lbl-dark"]: isDark
    })
    return (
      <Form layout="inline">

        <FormItem required={false}
          className={styles["input-item"]}
          style={{
            margin: "0",
            display: "inline-block",
            width: "240px"
          }}>
          {getFieldDecorator(keyConfig, {
            initialValue: value,

          })(
            <Input
              disabled={loading}
              placeholder={textConfig["placeholder"]}
              style={{ width: "100%" }}
              onPressEnter={this.handleSubmit} />
            )}
        </FormItem>
        <Button
          type="primary"
          size="large"
          icon="search"
          style={{ marginRight: "15px" }}
          onClick={this.handleSubmit}>{textConfig["button"] || "搜索"}</Button>

        <FormItem
          style={{
            margin: "0",
            display: "inline-block",
          }}
          required={false}
          label={<span className={lblClasses}>每页条数</span>}>
          {getFieldDecorator("limit", {
            initialValue: (defaultValue.limit || pageSizeRange[0]) + "",
          })(
            <Select disabled={loading}
              style={{ width: "120px" }}
              onChange={this.onPageSizeChange}>
              {
                pageSizeRange.map((i, index) => (
                  <Select.Option value={i + ""}
                    key={`${index}-option`}>
                    {i}
                  </Select.Option>
                ))
              }
            </Select>
            )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(QueryForm);
