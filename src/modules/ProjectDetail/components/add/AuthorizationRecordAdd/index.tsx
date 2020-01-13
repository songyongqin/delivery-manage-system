import * as React from 'react'
const styles = require("./styles.less")
import extraConnect from 'domainUtils/extraConnect'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
import { PROJECT_DETAIL_NAMESPACE } from 'constants/model'
import {Modal, Icon, Form, Input, Button, message as Message, Select,Popconfirm, Upload,DatePicker} from 'antd'
const {Item} = Form
const {Option} = Select
const { TextArea } = Input;
import reqwest from 'reqwest';
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http
import moment from 'moment'
import {getTime} from 'utils/getTime'

const mapStateToProps = state => {
  return {
    state,
    loading: state.loading.effects[`${PROJECT_DETAIL_NAMESPACE}/addRecord`]
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addUser: payload => dispatch({
      type: `${PROJECT_DETAIL_NAMESPACE}/addRecord`,
      payload
    }),
  }
}

@extraConnect(mapStateToProps, mapDispatchToProps)
@WithAnimateRender
@WithCommonProps
class AuthorizationRecordAdd extends React.Component<any, any> {

  handleOk = () => {
    this.props.closePop()
  }
  handleCancel = () => {
    this.props.closePop()
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        let obj = {id:this.props.id, pid: this.props.pid}
        values['lastDue'] = Number(getTime(values.lastDue))
        values['latestDueDate'] = Number(getTime(values.latestDueDate))
        values = {...values, ...obj}
        this.props.addUser(values)
        .then(res => {
          this.props.closePop()
          this.props.getTable()
          Message.success('添加成功');
        })
      }
    })
  }
  
  reset = () => {
    this.props.form.resetFields()
  }

  render() {

    const {popVisible} = this.props
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    }
    return (
      <Modal
        destroyOnClose = {true}
        title={
          <div>
            <Icon type='plus'/>
            <span>新增授权记录</span>
          </div>
        }
        footer = {null}
        visible={popVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Item  label="上次到期时间">
            {getFieldDecorator('lastDue', {
              rules: [{ required: true, message: '请输入上次到期时间'}],
            })(<DatePicker />)}
          </Item>
          <Item  label="授权时长">
            {getFieldDecorator('authorizedTime', {
              rules: [{ required: true, message: '请输入授权时长'}],
              initialValue: "",
            })(<Input />)}
          </Item>
          <Item  label="最新到期日期">
            {getFieldDecorator('latestDueDate', {
              rules: [{ required: true, message: '请输入最新到期日期'}],
            })(<DatePicker />)}
          </Item>
          <Item  label="备注">
            {getFieldDecorator('remarks', {
              initialValue: "",
            })(<TextArea rows={4} />)}
          </Item>
          <div style={{display:'flex', justifyContent:'space-around'}}>
            <Button  type="primary"
                size="small"
                style={{ borderRadius: "5px", width: "70px" }}
                htmlType="submit">
                保存
            </Button>
            <Popconfirm
              title="是否重置表单"
              onConfirm={this.reset}
              okText="Yes"
              cancelText="No"
            >
              <Button  type="primary"
                size="small"
                style={{ borderRadius: "5px", width: "70px" }}
                >
                重置
              </Button>
            </Popconfirm>
          </div>
        </Form>
      </Modal>
    )
  }
}
export default Form.create()(AuthorizationRecordAdd)
