import * as React from 'react'
const styles = require("./styles.less")
import extraConnect from 'domainUtils/extraConnect'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
import { USER_NAMESPACE } from 'constants/model'
import {Modal, Icon, Form, Input, Button, message as Message, Select} from 'antd'
const {Item} = Form
const {Option} = Select
const { TextArea } = Input;



const mapStateToProps = state => {
  return {
    state,
    loading: state.loading.effects[`${USER_NAMESPACE}/addUser`]
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addUser: payload => dispatch({
      type: `${USER_NAMESPACE}/addUser`,
      payload
    }),
  }
}

@extraConnect(mapStateToProps, mapDispatchToProps)
@WithAnimateRender
@WithCommonProps
class AddUser extends React.Component<any, any> {

  state = {
    userType:2,
    inputType:"password"
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
        this.props.addUser(values)
        .then(_ => {
          this.props.closePop()
          this.props.getTable()
          Message.success('添加成功');
        })
      }
    });
  }
  changeType = () => {
    const {inputType} = this.state
    if (inputType === "password") {
      this.setState({inputType:"text"})
    }else{
      this.setState({inputType:"password"})
    }
  }
  render() {
    const {popVisible} = this.props
    const {userType, inputType} = this.state
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
    return (
      <Modal
        destroyOnClose = {true}
        title={
          <div>
            <Icon type='plus'/>
            <span>添加新用户</span>
          </div>
        }
        footer = {null}
        visible={popVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Item  label="用户账号">
            {getFieldDecorator('accountName', {
              rules: [{ required: true, message: '请输入用户账号'}],
              initialValue: "",
            })(<Input />)}
          </Item>
          <Item  label="用户密码">
            {getFieldDecorator('accountPassword', {
              rules: [{ required: true, message: '请输入用户密码'}],
              initialValue: "",
            })(
              <div>
                <Input style={{width: 300}} type={inputType} />
                <span className={styles['password']} onClick={this.changeType}></span>
              </div>
            )}
          </Item>

          <Item  label="用户类型">
          {getFieldDecorator('userType', {
              rules: [{ required: true}],
              initialValue: userType,
            })(
              <Select>
              <Option value={1}>管理员</Option>
              <Option value={2}>普通用户</Option>
              <Option value={3}>权限用户</Option>
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
export default Form.create()(AddUser)
