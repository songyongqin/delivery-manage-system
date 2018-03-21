import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd';
import React from 'react';
import styles from './styles.css';
import {
  SOURCE_IP_DATA_INDEX,
  TARGET_IP_DATA_INDEX,
} from '../../ConstConfig'
import classnames from 'classnames';

const PORT_DATA_INDEX = "port"

const labelTextConfig = {
  [SOURCE_IP_DATA_INDEX]: "攻击源IP",
  [TARGET_IP_DATA_INDEX]: "目的IP",
  [PORT_DATA_INDEX]: "端口搜索"
}

const placeholderTextConfig = {
  [SOURCE_IP_DATA_INDEX]: "请输入IP",
  [TARGET_IP_DATA_INDEX]: "请输入IP",
  [PORT_DATA_INDEX]: "如：8080"
}

const pageSizeRange = [10, 20, 30, 50];

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

      values.limit = parseInt(values.limit);

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
    const { isDark, defaultValue = {}, loading = false, textConfig = {}, style = {}, keyConfig = "value" } = this.props;
    const { value = "" } = defaultValue;

    const labelClasses = classnames({
      ["lbl-dark"]: isDark
    })

    return (
      <Form>
        <Row gutter={10}>
          {/* {
            [SOURCE_IP_DATA_INDEX, TARGET_IP_DATA_INDEX, PORT_DATA_INDEX].map((i, index) => <Col span={6} key={`${index}-item`}>
              <FormItem
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                label={<span className={labelClasses}>{labelTextConfig[i]}</span>}
                required={false}>
                {getFieldDecorator(i, {
                  initialValue: defaultValue[i],
                })(
                  <Input placeholder={placeholderTextConfig[i]}
                    style={{ width: "100%" }}
                    onPressEnter={this.handleSubmit} />
                  )}
              </FormItem>
            </Col>)

          } */}
          <Col span={4}>
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
          </Col>
          {/* <Col span={2}>
            <Button
              type="primary"
              size="large"
              icon="search"
              onClick={this.handleSubmit}>{textConfig["button"] || "搜索"}</Button>
          </Col> */}
        </Row>

      </Form>
    );
  }
}

export default Form.create()(QueryForm);
