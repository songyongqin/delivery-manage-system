

import React, { Component } from 'react'
import extraConnect from 'domainUtils/extraConnect'
import { LAYOUT_NAMESPACE } from 'constants/model'
import { Radio, Button, Form } from 'antd'
import { postTimeConfig, getTimeConfig } from 'services/user'
import { message } from 'antd'

const styles = require('./index.less')

const mapStateToProps = state => {
  return {
    state,
    timeConfig: state[LAYOUT_NAMESPACE].timeConfig
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    // post: payload => dispatch({ type: `${LAYOUT_NAMESPACE}/postTimeConfig`, payload }),
    get: _ => dispatch({ type: `${LAYOUT_NAMESPACE}/getConfiForTime` }),
  }
}

const constantsArr = [
  { text:'今天', value: 1 },
  { text:'过去3天', value: 3 },
  { text:'过去7天', value: 7 },
  { text:'过去14天', value: 14 },
  { text:'过去30天', value: 30 },
  { text:'过去三个月', value: 90 },
  { text:'全部', value: 'all' },
]


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 1 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

@extraConnect(mapStateToProps, mapDispatchToProps)
class TimeConfigPage extends Component<any,any>{
  constructor(props){
    super(props)
    this.state={
      loading: false
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.post(values)
      }
    })
  }


  post = (obj) => {
    this.setState({ loading: true })
    postTimeConfig(obj).then(res => {
      message.success('修改成功');
      
      return  getTimeConfig()
    } ).then(res => {
      const timeConfig = res&&res.payload&&res.payload.timeConfig || 1;
      this.props.dispatch({ type: `${LAYOUT_NAMESPACE}/transfromTimeConfig`, payload: { timeConfig } });
      this.props.form&&this.props.form.setFieldsValue&&this.props.form.setFieldsValue({ timeConfig });
      this.setState({ loading: false });
    }).finally(()=> this.setState({ loading: false }))
  }


  render(){
    
    const timeConfig = this.props.timeConfig|| constantsArr[0].value
    const { getFieldDecorator } = this.props.form;
    return(
      <div className={ styles.container }   >
        <div style={{ fontWeight:700, fontSize:14, marginBottom:30 }} >时间设置</div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="默认时间：" style={{ display: 'flex', alignItems:'center' }} >
          {getFieldDecorator('timeConfig', {
            initialValue: timeConfig,
          })(  <Radio.Group buttonStyle="solid" >
                {
                  constantsArr.map(i => <Radio.Button value={ i.value }  key={ i.value } style={{ margin:5 }} >{ i.text }</Radio.Button> )
                }
              </Radio.Group>)}
        </Form.Item>
        <Form.Item >
          <Button type='primary' htmlType='submit' loading={ this.state.loading } >提交</Button>
        </Form.Item>
        </Form>
      </div>

    )
  }
}

export default Form.create()(TimeConfigPage)