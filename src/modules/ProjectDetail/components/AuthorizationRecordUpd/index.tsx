import * as React from 'react'
const styles = require("./styles.less")
import extraConnect from 'domainUtils/extraConnect'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
import { PROJECT_DETAIL_NAMESPACE } from 'constants/model'
import {Modal, Icon, Form, Input,DatePicker, Button, message as Message, Select, Upload, Checkbox, Popover} from 'antd'
const {Item} = Form
import moment from 'moment'

const mapStateToProps = state => {
  return {
    state,
    loading: state.loading.effects[`${PROJECT_DETAIL_NAMESPACE}/updRecord`]
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updRecord: payload => dispatch({
      type: `${PROJECT_DETAIL_NAMESPACE}/updRecord`,
      payload
    }),
  }
}
@extraConnect(mapStateToProps, mapDispatchToProps)
@WithAnimateRender
@WithCommonProps
class AuthorizationRecordUpd extends React.Component<any, any> {

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
        let obj = {id:this.props.id, pid: this.props.pid,cid :this.props.data.cid}
        values.lastDue = moment(values.lastDue, 'YYYY-MM-DD').valueOf()
        values.latestDueDate = moment(values.latestDueDate, 'YYYY-MM-DD').valueOf()
        let req = {...values,...obj}
        this.props.updRecord({...req})
        .then(res => {
          this.props.closePop()
          this.props.getTable()
          Message.success('修改成功');
        })
      }
    });
  }
  render() {
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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 4,
          offset: 20,
        },
        sm: {
          span: 4,
          offset: 20,
        },
      },
    }
    const { getFieldDecorator } = this.props.form
    const {popVisible} = this.props
    const {id, lastDue, authorizedTime, latestDueDate, state, remarks} = this.props.data
    return (
      <Modal
        destroyOnClose = {true}
        title={
          <div>
            <Icon type='plus'/>
            <span>修改授权记录</span>
          </div>
        }
        footer = {null}
        visible={popVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit} >
          <Item  label="上次到期时间">
            {getFieldDecorator('lastDue', {
              rules: [{ required: true, message: '请输入上次到期时间'}],
              initialValue:moment(lastDue)
            })(<DatePicker />)}
          </Item>
          <Item  label="授权时长">
            {getFieldDecorator('authorizedTime', {
              rules: [{ required: true, message: '请输入授权时长'}],
              initialValue: authorizedTime,
            })(<Input />)}
          </Item>
          <Item  label="最新到期时间">
            {getFieldDecorator('latestDueDate', {
              rules: [{ required: true, message: '请输入最新到期时间'}],
              initialValue:moment(latestDueDate)
            })(<DatePicker />)}
          </Item>
          <Item  label="状态">
            {getFieldDecorator('state', {
              rules: [{ required: true, message: '请输入状态'}],
              initialValue: state,
            })(<Input />)}
          </Item>
          <Item  label="备注">
            {getFieldDecorator('remarks', {
              rules: [{ required: true, message: '请输入备注'}],
              initialValue: remarks,
            })(<Input />)}
          </Item>
          <Item {...tailFormItemLayout}>
            <Button  type="primary"
                size="small"
                style={{ borderRadius: "5px", width: "70px" }}
                htmlType="submit">
                保存
            </Button>
          </Item>
        </Form>
      </Modal>
    )
  }
}
export default Form.create()(AuthorizationRecordUpd)