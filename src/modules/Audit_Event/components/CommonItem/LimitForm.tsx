import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd';
import React from 'react';
import styles from './styles.css';

import classnames from 'classnames';

const pageSizeRange = [10, 20, 30, 50];

const FormItem = Form.Item;

class QueryForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, form } = this.props
    form.validateFieldsAndScroll((err, values) => {
      if (this.props.loading) {
        return;
      }

      values.limit = parseInt(values.limit)

      if (!err) {
        onSubmit && onSubmit(values)
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
    const { isDark, defaultValue = {}, loading = false, textConfig = {}, style = {}, keyConfig = "value" } = this.props;
    const { value = "" } = defaultValue;

    const labelClasses = classnames({
      ["lbl-dark"]: isDark
    })

    return (
      <Form style={{ width: "260px" }}>
        {/* <Row gutter={10}>
          <Col span={4}> */}
        <FormItem
          style={{
            margin: "0",
            display: "inline-block",
          }}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          required={false}
          label={<span className={labelClasses}>每页条数</span>}>
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
        {/* </Col>
        </Row> */}

      </Form>
    );
  }
}

export default (Form.create as any)()(QueryForm)
