import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd';
import React from 'react';
import * as tools from '../../../../utils/tools';
import {
  PROTOCOL_TYPE_DATA_INDEX,
  protocolTypeList,
  HTTP,
  TCP,
  SMTP,
  DNS,
  FTP,
  SSH,
  URL_DATA_INDEX,
  TIME_DATA_INDEX,
  TARGET_IP_DATA_INDEX,
  TARGET_PORT_DATA_INDEX,
  SOURCE_IP_DATA_INDEX,
  SOURCE_PORT_DATA_INDEX,
  REQUEST_DOMAIN_DATA_INDEX,
  SENDER_DATA_INDEX,
  RECEIVE_DATA_INDEX,
} from '../../ConstConfig'
import classnames from 'classnames';
const FormItem = Form.Item;

const INPUT_DATA_INDEX = "value"

const pageSizeRange = [10, 20, 30, 50];

const placeholderConfig = {
  [HTTP]: "请输入部分或完整URL，如baidu.com",
  [TCP]: "请输入源ip:port或目的ip:port",
  [SMTP]: "请输入源ip:port或目的ip:port",
  [DNS]: "请输入部分或完整URL，如baidu.com",
  [FTP]: "请输入源ip:port或目的ip:port",
  [SSH]: "请输入源ip:port或目的ip:port"
}

const filterDataIndexes = [
  URL_DATA_INDEX,
  SOURCE_IP_DATA_INDEX,
  SOURCE_PORT_DATA_INDEX,
  TARGET_IP_DATA_INDEX,
  TARGET_PORT_DATA_INDEX,
  REQUEST_DOMAIN_DATA_INDEX,
  SENDER_DATA_INDEX,
  RECEIVE_DATA_INDEX
]

class QueryForm extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit && onSubmit({
          value: values.value
        });
      }
    });
  };
  onPageSizeChange = value => {
    const { onSubmit } = this.props;
    onSubmit && onSubmit({
      limit: parseInt(value)
    })
  }
  onProtocolChange = value => {
    const { onSubmit } = this.props;

    const initFilter = {};

    filterDataIndexes.forEach(key => {
      initFilter[key] = ""
    })

    onSubmit && onSubmit({
      ...initFilter,
      [PROTOCOL_TYPE_DATA_INDEX]: value
    })
  }
  render() {

    const { getFieldDecorator } = this.props.form;
    const { isDark, defaultValue = {}, loading = false } = this.props;
    const lblClasses = classnames({
      ["lbl-dark"]: isDark
    })
    return (
      <Form layout="inline">
        {/* <FormItem required={false}>
          {getFieldDecorator(INPUT_DATA_INDEX, {
            initialValue: defaultValue[INPUT_DATA_INDEX] || "",
          })(
            <Input disabled={loading}
              placeholder={placeholderConfig[defaultValue[PROTOCOL_TYPE_DATA_INDEX]]}
              onPressEnter={this.handleSubmit}
              style={{ display: "inline-block", width: "260px" }}></Input>
            )}
          <Button type="primary"
            icon="search"
            onClick={this.handleSubmit}>
            搜索
                    </Button>
        </FormItem> */}
        <FormItem required={false}
          label={<span className={lblClasses}>协议类型</span>}>
          {getFieldDecorator(PROTOCOL_TYPE_DATA_INDEX, {
            initialValue: defaultValue[PROTOCOL_TYPE_DATA_INDEX] || protocolTypeList[0],
          })(
            <Select disabled={loading}
              style={{ width: "120px" }}
              onChange={this.onProtocolChange}>
              {
                protocolTypeList.map((i, index) => (
                  <Select.Option key={`${index}-option`}
                    value={i}>
                    {i.toUpperCase()}
                  </Select.Option>
                ))
              }
            </Select>
            )}
        </FormItem>
        <FormItem required={false}
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
