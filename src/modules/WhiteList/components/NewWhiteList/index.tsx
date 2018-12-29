

import React from 'react'
import { Form, Button, Input, Select } from 'antd'
import { ipReg } from 'utils/tools'


const arr = ['域名', 'ip', 'id']

class NewWhiteList extends React.Component<any, any>{
  constructor(props){
    super(props)
    this.state={
      checkIp: false,
      changeKey: 0
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields({force:true},(err, values) => {
      if(!err){
        this.props.onSubmit(values)
      }
    })
  }

  onChange= value => {
    this.setState({ checkIp: value===arr[1], changeKey: +new Date() })
  }

  render(){
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
    const { getFieldDecorator } = this.props.form
    const { checkIp } = this.state 
    return(
      <Form  onSubmit={this.handleSubmit} style={{ padding:30 }} >
        <Form.Item label='白名单类型' {...formItemLayout} >
          {getFieldDecorator('types', {
            rules: [{ required: true }],
            initialValue: arr[0]
          })(
            <Select onChange={ this.onChange } > 
              {
                arr.map((i, index) => 
                  <Select.Option key={index} value={ i } >{i}</Select.Option>
                )
              }
            </Select>
          )}
        </Form.Item>
        <Form.Item  label='白名单特征' {...formItemLayout} >
          {getFieldDecorator('feature', {
            rules: [{ required: true, message: checkIp ? '请输入ip': '请输入白名单特征', pattern: checkIp ? ipReg :""  }],
          })(
            <Input   />
          )}
        </Form.Item>
        <Form.Item   >
          <Button
            type="primary"
            loading={ this.props.loading }
            style={{ marginLeft:'33%' }}
            htmlType="submit" >
            提交
          </Button>
        </Form.Item>
      </Form>
    )
  }
}


export default Form.create()(NewWhiteList)