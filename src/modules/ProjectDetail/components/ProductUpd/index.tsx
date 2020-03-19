import * as React from 'react'
const styles = require("./styles.less")
import extraConnect from 'domainUtils/extraConnect'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
import { PROJECT_DETAIL_NAMESPACE } from 'constants/model'
import {Modal, Icon, Form, Input,DatePicker, Button, message as Message, Select} from 'antd'
const {Item} = Form
const {Option} = Select
import moment from 'moment'
import {getTime} from 'utils/getTime'

const mapStateToProps = state => {
  return {
    state,
    loading: state.loading.effects[`${PROJECT_DETAIL_NAMESPACE}/updRecord`]
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updProduct: payload => dispatch({
      type: `${PROJECT_DETAIL_NAMESPACE}/updProduct`,
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
        let obj = {id:this.props.id, pid: this.props.pid}
        let req = {...values,...obj}
        this.props.updProduct({...req})
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
    const {productName, productVersion, deviceID, productNumber, productState} = this.props.data
    let forProductState = 0
    switch(productState) {
      case "硬件采购": forProductState = 1;break;
      case "灌装测试": forProductState = 2;break;
      case "产品检验": forProductState = 3;break;
      case "出货": forProductState = 4;break;
    }
    console.log(productState,111111)
    const {popVisible} = this.props
    return (
      <Modal
        destroyOnClose = {true}
        title={
          <div>
            <Icon type='edit'/>
            <span>修改产品信息</span>
          </div>
        }
        footer = {null}
        visible={popVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit} >
          <Item  label="产品名称">
            {getFieldDecorator('productName', {
              rules: [{ required: true, message: '请输入产品名称'}],
              initialValue: productName,
            })(<Input />)}
          </Item>
          <Item  label="产品版本号">
            {getFieldDecorator('productVersion', {
              rules: [{ required: true, message: '请输入产品版本号'}],
              initialValue: productVersion,
            })(<Input />)}
          </Item>
          <Item  label="设备ID">
            {getFieldDecorator('deviceID', {
              rules: [{ required: true, message: '请输入设备ID'}],
              initialValue: deviceID,
            })(<Input />)}
          </Item>
          <Item  label="产品编号">
            {getFieldDecorator('productNumber', {
              rules: [{ required: true, message: '请输入产品编号'}],
              initialValue: productNumber,
            })(<Input />)}
          </Item>
          <Item  label="产品状态">
            {getFieldDecorator('productState', {
              rules: [{ required: true, message: '请输入产品状态'}],
              initialValue: forProductState,
            })(
              <Select>
                <Option value={1}>硬件采购</Option>
                <Option value={2}>灌装测试</Option>
                <Option value={3}>产品检验</Option>
                <Option value={4}>出货</Option>
              </Select>
              )}
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