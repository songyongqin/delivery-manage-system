import * as React from 'react'
import { Form, DatePicker, TimePicker, Button, Select, message, Input, Switch, InputNumber } from 'antd'
import { SCANCYCLE } from '../constants'
import { AUDIT_ASSETS_NAMESPACE } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import moment from 'moment'
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea

var getArray = length => Array.from({ length }).map((v, k) => k);

@extraConnect(
  state => {
    return {
      loading: state.loading.effects[`${AUDIT_ASSETS_NAMESPACE}/fetchAuditConfig`]
    }
  },
)
class configForm extends React.Component<any, any> {
  state = {
    select: null,
    change: false,
    switch_: true,
    switchChange: false
  }
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        'isScanning': fieldsValue['isScanning'] ? 1 : 0,
        'scanCycle': fieldsValue['scanCycle'] == "define" ? fieldsValue['define'] : fieldsValue['scanCycle'],
        'startTime': fieldsValue['startTime'],
        'scanIpRange': fieldsValue['scanIpRange'].split(/[\n]/),
        'checkAllPort': fieldsValue['checkAllPort'] ? 1 : 0,
        'checkPort': fieldsValue['checkPort'] ? fieldsValue['checkPort'].split(',') : []
      };
      this.props.onOk(values)
    })
  }

  selectChange = (select) => {
    this.setState({ select, change: true })
  }

  switchChange = (switch_) => {
    switch_ ? this.setState({ switch_: true, switchChange: true }) : this.setState({ switch_: false, switchChange: true })
  }
  range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }


  checkAllPort = (rule, value, callback) => {
    const form = this.props.form;
    let regu = /^[\d,]*$/;
    if (regu.test(value)) {
      callback()
    }
    callback("端口号格式不正确");
  }
  checkData = (rule, value, callback) => {
    let regu = /^[1-9]\d*$/;
    if (regu.test(value)) {
      callback();
    }
    callback("请输入正整数")
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { defaultConfig } = this.props;
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
          label="开启资产扫描"
        >
          {getFieldDecorator('isScanning', {
            valuePropName: 'checked',
            initialValue: defaultConfig.isScanning == 1
          })(
            <Switch checkedChildren="开" unCheckedChildren="关" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="扫描周期"
        >
          {getFieldDecorator('scanCycle', { initialValue: defaultConfig.scanCycle == 1 || defaultConfig.scanCycle == 7 || defaultConfig.scanCycle == 14 ? defaultConfig.scanCycle.toString() : "define" })(
            <Select style={{ width: "120px" }} onChange={this.selectChange}>
              {
                SCANCYCLE.map(i => <Option key={i.value} value={i.value}>{i.text}</Option>)
              }
            </Select>
          )}
        </FormItem>
        {
          this.state.select == "define" || (!this.state.change && defaultConfig.scanCycle != 1 && defaultConfig.scanCycle != 7 && defaultConfig.scanCycle != 14)
            ?
            <FormItem
              {...formItemLayout}
              label="自定义"
            >
              {getFieldDecorator('define', {
                initialValue: this.state.select == "define" ? null : defaultConfig.scanCycle,
                rules: [
                  {
                    required: true, message: '自定义天数不能为空',
                  },
                  {
                    validator: this.checkData
                  }],
              })(
                <Input style={{ width: "100px" }} />
              )}
              <span>&nbsp;天扫描一次</span>
            </FormItem>
            :
            null
        }

        <FormItem
          {...formItemLayout}
          label="扫描开始时间"
        >
          {getFieldDecorator('startTime', { initialValue: defaultConfig.startTime })(
            <Select style={{ width: "120px" }}>
              {
                sTime.map(i => <Option key={i} value={i}>{i}</Option>)
              }
            </Select>
          )}
          <span>&nbsp;点</span>
        </FormItem>
        <Form.Item
          {...formItemLayout}
          label="扫描IP范围"
        >
          {getFieldDecorator('scanIpRange', { initialValue: defaultConfig.scanIpRange }, {
            rules: [
              {
                required: true, message: '扫描IP范围不能为空',
              }]
          })(
            <TextArea
              placeholder="多个IP段请换行隔开，如：&#10;172.31.50.1-172.31.50.255,&#10;172.31.51.1-172.31.51.255" autosize={{ minRows: 4, maxRows: 8 }} />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="全端口扫描"
        >
          {getFieldDecorator('checkAllPort', {
            valuePropName: 'checked',
            initialValue: defaultConfig.checkAllPort == 1
          })(
            <Switch checkedChildren="开" unCheckedChildren="关" onChange={this.switchChange} />
          )}
        </Form.Item>
        {
          !this.state.switch_ || (defaultConfig.checkAllPort == 0 && !this.state.switchChange)
            ?
            <FormItem
              {...formItemLayout}
              label="自定义端口"
            >
              {getFieldDecorator('checkPort', {
                initialValue: defaultConfig.checkPort,
                rules: [
                  {
                    required: true, message: '自定义天数不能为空',
                  },
                  {
                    validator: this.checkAllPort,
                  }],
              })(
                <TextArea placeholder="不填则默认检测全部端口,&#10;填写多个端口请用逗号隔开，如：&#10;1,2,3,4,5" autosize={{ minRows: 4, maxRows: 8 }} />
              )}
            </FormItem>
            :
            null
        }
        <Form.Item>
          <Button loading={this.props.loading} style={{ float: "right" }} type="primary" htmlType="submit" onClick={this.handleSubmit}>提交</Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedForm = Form.create()(configForm);
export default WrappedForm