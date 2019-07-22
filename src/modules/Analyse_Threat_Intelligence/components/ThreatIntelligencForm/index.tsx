

import * as React from 'react'
import { Form, Input, Select, Button } from 'antd'
import { APTThreatIntelligence, C2ThreatIntelligence, HoneynetThreatIntelligence,  DDOSThreatIntelligence, intelligenceKeyObj  } from './constants'
import flatten from 'lodash/flatten'


const Option = Select.Option

const intelligenceTypeArr = ['IP', 'IPPORT', 'DOMAIN', 'MD5', 'SHA256']
const dataSourceArr = [
  { value:"C2", text:"C2威胁情报" },
  { value:"APT", text:"APT威胁情报" },
  { value:"Honeynet", text:"Honeynet漏洞数据" },
  { value:"DDOS", text:"DDOS威胁情报" },
  { value:"other", text:"其他" },
]

const getOtherItem = (value:string)=> {
  if(value==='C2'){
    return C2ThreatIntelligence;
  }
  else if(value==='APT'){
    return APTThreatIntelligence;
  }
  else if(value==='Honeynet'){
    return HoneynetThreatIntelligence;
  }
  else if(value==='DDOS'){
    return DDOSThreatIntelligence;
  }
  else {
    return C2ThreatIntelligence;
  }
}

const transfromValue = (keys:string, arr:object[]) => {
  let array = arr.filter(i =>  i['value']===keys)
  return array&&array.length ? array['text'] : arr[0]['text']
}

const transfromDatasource = (str:string) => {
  let array = dataSourceArr.filter(i =>  i['text']===str)
  console.log(str, array)
  return array&&array.length ?  array[0]['value'] : str
}

const detail = [[{name:"md5", value:"246sadggasd"}]]



const getDetailValue = (keys,arr) => {
  try{
    if(arr&&arr.length){
      let array = flatten(arr)
      let arrays = array.filter(i => i.name===intelligenceKeyObj[keys])
      console.log(keys, arr, array, arrays)
      return arrays&&arrays.length ? arrays[0]['value'] : ''
    }
  }
  catch(err){
    return ''
  }
}

class ThreatIntelligenceForm extends React.Component<any,any>{
  constructor(props){
    super(props)
    this.state={
      otherItem: getOtherItem(this.props.defaultValue&&this.props.defaultValue.intelligenceContent&&this.props.defaultValue.intelligenceContent||dataSourceArr[0].value)
    }
  }

  handleChange = value => {
    let arr = ['C2', 'DDOS', 'Honeynet']
    if(arr.includes(value)){
      this.props.form.setFieldsValue({
        intelligenceType: `IP`,
      })
    }
    let otherItem = getOtherItem(value)
    this.setState({ otherItem })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let obj = { ...values, dataSource: transfromDatasource(values['dataSource']) }
        this.props.onSubmit(obj)
      }
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { otherItem } = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6},
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    const { defaultValue = {}, submitLoading=false } = this.props
    return(
      <Form onSubmit={this.handleSubmit} {...formItemLayout} style={{ padding: 20 }} >
        <Form.Item  label='威胁名称' >
          {getFieldDecorator('threatName', {
            rules: [{ required: true, message: '请输入威胁名称' }],
            initialValue: defaultValue.threatName || ''
          })(
            <Input />,
          )}
        </Form.Item>
        <Form.Item  label='情报类型' >
          {getFieldDecorator('intelligenceType', {
            rules: [{ required: true, message: '请选择情报类型' }],
            initialValue: defaultValue.intelligenceType || intelligenceTypeArr[0]
          })(
            <Select >
              {
                intelligenceTypeArr.map(i => <Option key={ i } value={ i } >{ i }</Option>)
              }
            </Select>,
          )}
        </Form.Item>
        <Form.Item  label='数据来源' >
          {getFieldDecorator('dataSource', {
            rules: [{ required: true, message: '请选择数据来源' }],
            initialValue: transfromValue(defaultValue.dataSource, dataSourceArr) || dataSourceArr[0].value
          })(
            <Select onChange={ this.handleChange } >
              {
                dataSourceArr.map(i => <Option key={ i.value } value={ i.value } >{ i.text }</Option>)
              }
            </Select>,
          )}
        </Form.Item>
        <Form.Item  label='情报内容' >
          {getFieldDecorator('intelligenceContent', {
            rules: [{ required: true, message: '请输入情报内容' }],
            initialValue: defaultValue.intelligenceContent || ''
          })(
            <Input id='intelligenceContent' />,
          )}
        </Form.Item>
        {
          otherItem&&otherItem.length ? otherItem.map(i => 
            <Form.Item  label={ i.text } key={ i.key } >
          {getFieldDecorator(i.key, {
            rules: [{  message: `请输入${i.text}` }],
            initialValue: getDetailValue(i.key, defaultValue['detail'] )|| ''
          })(
            <Input   />,
          )}
        </Form.Item>) : null
        }
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit"  loading={ submitLoading }>
            { this.props.isNew ? '添加' : '修改' }
          </Button>
        </Form.Item>
      </Form>
    )
  }
}




export default Form.create()(ThreatIntelligenceForm)