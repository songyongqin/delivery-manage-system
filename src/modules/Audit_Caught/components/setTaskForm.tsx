import * as React from 'react'
import { Form, DatePicker, TimePicker, Button, Select, message, Input, Switch, Radio, Slider } from 'antd'
import { SCANCYCLE } from '../constants'
import { AUDIT_CAUGHTTASK_NAMESPACE } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import SetConfig from './setConfig'
import moment from 'moment'
import { ipReg, portReg } from 'utils/tools'
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
    value: 0,
  }
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        'taskName': fieldsValue['taskName'],
        'ip': fieldsValue['ip'],
        'startTime': fieldsValue['startTime'].unix(),
        'setType': fieldsValue['setType'],
        'setConfig': fieldsValue['set'].units == "mm" ? fieldsValue['set'].number * 60 : fieldsValue['set'].units == "G" ? fieldsValue['set'].number * 1024 : fieldsValue['set'].number,
      };
      this.props.onOk(values)
    })
  }

  onChange = (e) => {
    this.setState({
      RadioValue: e.target.value,
    });
    this.props.form.setFieldsValue({
      set: { number: 1, units: e.target.value == 'time' ? 'ss' : 'M' },
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

  checkSet = (rule, value, callback) => {
    if (value.units == "ss") {

      value.number > 0 && value.number <= 10 * 60 ?
        callback()
        :
        callback("设置范围为1-10分钟")
      return;
    }
    if (value.units == "mm") {

      value.number > 0 && value.number <= 10 ?
        callback()
        :
        callback("设置范围为1-10分钟")
      return;
    }
    if (value.units == "M") {
      value.number > 0 && value.number <= 10 * 1024 ?
        callback()
        :
        callback("设置范围为1-10G")
      return;
    }
    if (value.units == "G") {
      value.number > 0 && value.number <= 10 ?
        callback()
        :
        callback("设置范围为1-10G")
      return;
    }
  }
  checkTaskName = (rule, value, callback) => {
    let regex = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]|[0-9]){1,1000000000}$");
    let res = regex.test(value);
    if (res) {
      callback();
    }
    else {
      callback("只包含中英文、数字、下划线");
    }
  }
  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().startOf('day');
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { defaultConfig } = this.props;
    const { RadioValue, units } = this.state

    const sTime = getArray(24);
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
            },
            { validator: this.checkTaskName }]
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
            },
            {
              pattern: ipReg,
              message: "请输入正确的抓包IP"
            }
            ]
          })(
            <Input></Input>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="开始时间"
        >
          {getFieldDecorator('startTime', { initialValue: moment(moment(), 'YYYY-MM-DD HH:mm') })(
            <DatePicker
              disabledDate={this.disabledDate}
              showTime={{
                defaultValue: moment('00:00', 'HH:mm'),
                // disabledMinutes: () => this.range(0, 60), 
                disabledSeconds: () => this.range(0, 60),
                format: 'HH:mm'
              }} format="YYYY-MM-DD HH:mm" />)}
        </FormItem>


        <FormItem
          {...formItemLayout}
          label="设置"
        >
          {getFieldDecorator('setType', { initialValue: "time" })(

            <RadioGroup onChange={this.onChange} value={this.state.RadioValue}>
              <Radio value={"time"}>时长</Radio>
              <Radio value={"size"}>大小</Radio>
            </RadioGroup>

          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={RadioValue == "time" ? "时长" : "大小"}
        >
          {getFieldDecorator('set', {
            initialValue: { number: 1, units: RadioValue == 'time' ? 'ss' : 'M' },
            rules: [{ validator: this.checkSet }],
          })(<SetConfig setValue={RadioValue} />)}
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