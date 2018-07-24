import * as React from 'react'
import { Form, DatePicker, TimePicker, Button, Select, message, Input, Switch, Radio, Slider } from 'antd'
import { SCANCYCLE } from '../constants'
import { AUDIT_CAUGHTTASK_NAMESPACE } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import moment from 'moment'
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea
const RadioGroup = Radio.Group;
const styles = require('./styles.less')
var getArray = length => Array.from({ length }).map((v, k) => k);

@extraConnect(
  state => {
    return {
      loading: state.loading.effects[`${AUDIT_CAUGHTTASK_NAMESPACE}/postCaughtTask`]
    }
  },
)
class configForm extends React.Component<any, any> {
  state = {
    select: null,
    change: false,
    switch_: true,
    switchChange: false,
    RadioValue: "time",
    value: 0
  }
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        // 'isScanning': fieldsValue['isScanning'] ? 1 : 0,
        ...fieldsValue,
        'startTime': fieldsValue['startTime'].unix(),
      };
      this.props.onOk(values)
    })
  }

  onChange = (e) => {
    this.setState({
      RadioValue: e.target.value,
    });
  }

  handleChange = (value) => {
    this.setState({ value });
  }

  formatter = (value) => {
    return `${value}%`;
  }

  range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { defaultConfig } = this.props;
    const sTime = getArray(24);
    const marks = {
      1: '1秒',
      10: {
        style: {
          color: '#f50',
        },
        label: <strong>10分钟</strong>,
      },
    };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="任务名称"
        >
          {getFieldDecorator('taskName', {
            rules: [{
              required: true, message: '任务名称不能为空'
            }]
          })(
            <Input></Input>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="抓包IP"
        >
          {getFieldDecorator('ip', {
            rules: [{
              required: true, message: '抓包IP不能为空'
            }]
          })(
            <Input></Input>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="开始时间"
        >
          {getFieldDecorator('startTime', { initialValue: moment(moment(), 'YYYY-MM-DD HH:mm:ss') })(
            <DatePicker showTime={{
              defaultValue: moment('00:00:00', 'HH:mm:ss'),
              // disabledMinutes: () => this.range(0, 60), 
              // disabledSeconds: () => this.range(0, 60),
            }} format="YYYY-MM-DD HH:mm:ss" />)}
        </FormItem>


        <FormItem
          {...formItemLayout}
          label="设置"
        >
          {getFieldDecorator('config', { initialValue: "time" })(

            <RadioGroup onChange={this.onChange} value={this.state.RadioValue}>
              <Radio value={"time"}>时长</Radio>
              <Radio value={"size"}>大小</Radio>
            </RadioGroup>

          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={this.state.RadioValue == "time" ? "时长" : "大小"}
        >
          {getFieldDecorator('define')(

            <Slider marks={marks} min={1} max={10} tipFormatter={this.formatter} onChange={this.handleChange} value={this.state.value} />

          )}
        </FormItem>
        <Form.Item>
          <Button loading={this.props.loading} style={{ float: "right" }} type="primary" htmlType="submit" onClick={this.handleSubmit}>提交</Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedForm = Form.create()(configForm);
export default WrappedForm