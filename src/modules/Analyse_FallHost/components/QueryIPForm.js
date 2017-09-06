import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd';
import React from 'react';

const ipReg=new RegExp("^(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\."
  +"(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\."
  +"(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\."
  +"(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)$");

const FormItem = Form.Item;

class QueryForm extends React.Component {
  constructor(props){
    super(props);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(!err){
        this.props.onSubmit&&this.props.onSubmit(values);
      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const {defaultValue={}, loading=false}=this.props;
    const {ip=""}=defaultValue;

    return (
      <Form style={{width:"300px"}} layout="inline">
        <FormItem  required={false}
                   style={{
                     margin:"0",
                   }}>
          {getFieldDecorator('ip', {
            initialValue:ip,
            rules:[
              {pattern:ipReg,message:"请输入有效的ip"}
            ]
          })(
            <Input placeholder="失陷主机搜索"
                   onPressEnter={this.handleSubmit}/>
          )}
        </FormItem>
        <Button type="primary"
                size="large"
                onClick={this.handleSubmit}>确定</Button>
      </Form>
    );
  }
}

export default Form.create()(QueryForm);
