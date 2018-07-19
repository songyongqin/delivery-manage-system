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
      loading: state.loading.effects[`${AUDIT_ASSETS_NAMESPACE}/fetchAuditEdit`]
    }
  },
)
class editForm extends React.Component<any, any> {
  state = {
    select: null
  }
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      this.props.onOk(fieldsValue)
    })
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="资产IP"
        >
          {getFieldDecorator('assetsIp', { initialValue: this.props.assetsIp })(
            <Input disabled style={{ width: "60%" }}></Input>
          )}
        </FormItem>

        <Form.Item
          {...formItemLayout}
          label="资产名称"
        >
          {getFieldDecorator('assetsName', {})(
            <TextArea placeholder="请填写资产名称" autosize={{ minRows: 1, maxRows: 3 }} />
          )}
        </Form.Item>
        <Form.Item>
          <Button loading={this.props.loading} style={{ float: "right" }} type="primary" htmlType="submit" onClick={this.handleSubmit}>提交</Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedForm = Form.create()(editForm);
export default WrappedForm