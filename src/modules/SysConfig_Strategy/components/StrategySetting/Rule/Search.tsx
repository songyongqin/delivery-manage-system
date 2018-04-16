import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd';
import React from 'react'
const FormItem = Form.Item


@(Form.create() as any)
class QueryForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { form, onSubmit } = this.props

    form.validateFieldsAndScroll((err, values) => {

      if (!err) {
        onSubmit && onSubmit(values)
      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form
    const { defaultValue = {}, loading = false, textConfig = {}, style = {}, keyConfig = "value" } = this.props
    const { value = "" } = defaultValue

    return (
      <Form style={{ width: "100%", overflow: "hidden", ...style, }} layout="inline">
        <FormItem required={false}
          wrapperCol={{ span: 24 }}
          style={{
            margin: "0",
            width: "calc(100% - 95px)",
          }}>
          {getFieldDecorator(keyConfig, {
            initialValue: value,
          })(
            <Input
              placeholder={textConfig["placeholder"]}
              style={{ width: "100%" }}
              disabled={loading}
              onPressEnter={this.handleSubmit} />
          )}
        </FormItem>
        <Button
          style={{ marginTop: "4px" }}
          type="primary"
          icon="search"
          loading={loading}
          onClick={this.handleSubmit}>{"搜索"}</Button>
      </Form>
    );
  }
}

export default QueryForm