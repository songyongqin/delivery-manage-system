import * as React from 'react'
import { Form, DatePicker, TimePicker, Button, Select, message, Input, Switch } from 'antd'
import { SCANCYCLE } from '../constants'
import { AUDIT_ASSETS_NAMESPACE } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import moment from 'moment'
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea
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
    change:false
  }
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        'isScanning': fieldsValue['isScanning'] ? 1 : 0,
        'scanCycle':fieldsValue['scanCycle']=="define"?fieldsValue['define']:fieldsValue['scanCycle'],
        'startTime': fieldsValue['startTime'].unix(),
        'scanIpRange': fieldsValue['scanIpRange'].split(/[\n]/),
        'checkPort':fieldsValue['checkPort']?fieldsValue['checkPort'].split(','):[]
      };
      this.props.onOk(values)
    })
  }

  selectChange = (select) => {
    this.setState({ select,change:true })
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
    const {defaultConfig}=this.props;

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
          {getFieldDecorator('isScanning',{valuePropName: 'checked',
            initialValue: defaultConfig.isScanning == 1})(
            <Switch checkedChildren="开" unCheckedChildren="关" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="扫描周期"
        >
          {getFieldDecorator('scanCycle', { initialValue: defaultConfig.scanCycle==1||defaultConfig.scanCycle==7||defaultConfig.scanCycle==14?defaultConfig.scanCycle.toString():"define" })(
            <Select style={{ width: "120px" }} onChange={this.selectChange}>
              {
                SCANCYCLE.map(i => <Option key={i.value} value={i.value}>{i.text}</Option>)
              }
            </Select>
          )}
        </FormItem>
        {
          this.state.select == "define"||(!this.state.change&&defaultConfig.scanCycle!=1&&defaultConfig.scanCycle!=7&&defaultConfig.scanCycle!=14)
            ?
            <FormItem
              {...formItemLayout}
              label="自定义"
            >
              {getFieldDecorator('define', { initialValue:  this.state.select == "define"?null:defaultConfig.scanCycle},{
                rules: [
                  {
                    required: true, message: '自定义天数不能为空',
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
          {getFieldDecorator('startTime', { initialValue:moment(moment(defaultConfig.startTime * 1000), 'YYYY-MM-DD HH')  })(
            <DatePicker showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss'), disabledMinutes: () => this.range(0, 60), disabledSeconds: () => this.range(0, 60), }} format="YYYY-MM-DD HH" />
          )}
        </FormItem>
        <Form.Item
          {...formItemLayout}
          label="扫描IP范围"
        >
          {getFieldDecorator('scanIpRange',{initialValue:defaultConfig.scanIpRange}, {
            rules: [
              {
                required: true, message: '扫描IP范围不能为空',
              }]
          })(
            <TextArea
            placeholder="多个IP段请换行隔开，如：
            172.31.50.1-172.31.50.255
            172.31.51.1-172.31.51.255" autosize={{ minRows: 2, maxRows: 6 }} />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="检测端口"
        >
          {getFieldDecorator('checkPort', {initialValue:defaultConfig.checkPort})(
            <TextArea placeholder="不填则默认检测全部端口
            填写多个端口请用逗号隔开，如：
            1,2,3,4,5" autosize={{ minRows: 2, maxRows: 6 }} />
          )}
        </Form.Item>
        <Form.Item>
          <Button loading={this.props.loading} style={{ float: "right" }} type="primary" htmlType="submit" onClick={this.handleSubmit}>提交</Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedForm = Form.create()(configForm);
export default WrappedForm