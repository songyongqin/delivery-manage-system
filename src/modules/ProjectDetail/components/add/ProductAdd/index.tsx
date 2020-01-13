
import * as React from 'react'
const styles = require("./styles.less")
import {Modal, Icon, Form, Input,DatePicker, Button, message as Message, Select} from 'antd'
import extraConnect from 'domainUtils/extraConnect'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
import { PROJECT_DETAIL_NAMESPACE } from 'constants/model'
const {Item} = Form
const {Option} = Select

const mapStateToProps = state => {
  return {
    state,
    loading: state.loading.effects[`${PROJECT_DETAIL_NAMESPACE}/addProduct`]
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addProduct: payload => dispatch({
      type: `${PROJECT_DETAIL_NAMESPACE}/addProduct`,
      payload
    }),
  }
}
@extraConnect(mapStateToProps, mapDispatchToProps)
@WithAnimateRender
@WithCommonProps
class ProductAdd extends React.Component<any, any> {

  state = {
    popVisible: false,
    reqData:{}
  }
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
        let obj = {id:this.props.id}
        let req = {...values,...obj}
        this.props.addProduct({...req})
        .then(res => {
          this.props.closePop()
          this.props.getTable()
          Message.success('修改成功');
        })
      }
    });
  }

  render() {
    const {popVisible} = this.props
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
    return (
      <Modal
        destroyOnClose = {true}
        title={
          <div>
            <Icon type='plus'/>
            <span>新增产品</span>
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
            })(<Input />)}
          </Item>
          <Item  label="产品版本号">
            {getFieldDecorator('productVersion', {
            })(<Input />)}
          </Item>
          <Item  label="设备ID">
            {getFieldDecorator('deviceID', {
            })(<Input />)}
          </Item>
          <Item  label="产品编号">
            {getFieldDecorator('productNumber', {
            })(<Input />)}
          </Item>
          <Item  label="产品状态">
            {getFieldDecorator('productState', {
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

export default Form.create()(ProductAdd)