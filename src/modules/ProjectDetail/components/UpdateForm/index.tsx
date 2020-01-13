import * as React from 'react'
const styles = require("./styles.less")
import { PROJECT_DETAIL_NAMESPACE } from 'constants/model'
import {Modal, Form, Input, Button, Select, Icon, DatePicker, message as Message } from 'antd'
const {Item} = Form
const {Option} = Select
const { TextArea } = Input;
import moment from 'moment'
import extraConnect from 'domainUtils/extraConnect'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
import {getTime} from 'utils/getTime'

const mapStateToProps = state => {
  return {
    state,
    loading: state.loading.effects[`${PROJECT_DETAIL_NAMESPACE}/updateProjectDetail`]
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateProjectDetail: payload => dispatch({
      type: `${PROJECT_DETAIL_NAMESPACE}/updateProjectDetail`,
      payload
    }),
  }
}
@extraConnect(mapStateToProps, mapDispatchToProps)
@WithAnimateRender
@WithCommonProps
class UpdateForm extends React.Component<any, any> {

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
        values.startTime = getTime(values.startTime)
        values = {...values, id:this.props.id}
        this.props.updateProjectDetail(values)
        .then(_ => {
          this.props.closePop()
          this.props.getTable()
          Message.success('修改成功')
        })
      }
    });
  }
  change = (e,i) => {
    console.log(e.target.value,i)
  }
  render() {
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
    const {popVisible} = this.props
    const {proName, cusName, proMsgs = [], remarks, startTime, state} = this.props.data
    let initArr = []
    proMsgs.map(el => {
      initArr.push(el.proMsg)
    })
    return (
      <Modal
        destroyOnClose = {true}
        title={
          <div>
            <Icon type='edit'/>
            <span>修改项目详情</span>
          </div>
        }
        footer = {null}
        visible={popVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit} >
          <Item  label="项目名称">
            {getFieldDecorator('proName', {
              initialValue: proName,
            })(<Input />)}
          </Item>
          <Item  label="客户名称">
            {getFieldDecorator('cusName', {
              initialValue: cusName,
            })(<Input />)}
          </Item>
          <Item  label="产品名称">
            {getFieldDecorator('proMsg', {
              initialValue: proMsgs,
            })(
              <ProductList proMsgs={proMsgs} />
            )}
          </Item>
          <Item  label="项目开始时间">
            {getFieldDecorator('startTime', {
              initialValue: moment(startTime*1000),
            })(<DatePicker />)}
          </Item>
          <Item  label="项目状态">
            {getFieldDecorator('state', {
              initialValue: state,
            })(
              <Select>
                <Option value={1}>进行中</Option>
                <Option value={2}>售后</Option>
              </Select>
            )}
          </Item>
          <Item  label="备注">
            {getFieldDecorator('remarks', {
              initialValue: remarks,
            })(<TextArea rows={4} />)}
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
export default Form.create()(UpdateForm)

class ProductList extends React.Component<any, any> {

  render() {
    const { proMsgs, onChange , value=[]} = this.props
    return (
      <div>
        {
          proMsgs.map((el,index) => {
            return (
              <Input value={el.proMsg} key ={index} onChange = { e => {
                let val = e.target.value
                value[index].proMsg = val
                onChange(value)
              }} />
            )
          })
        }
      </div>
    )
  }
}

// const ProductList = (props) => {
//    return (
//     <div>
//     {
//       proMsg.map((el,index) => {
//         return (
//           <Input value={el} key ={index} onChange = { e => {
//             let val = e.target.value
//             value[index] = val
//             onChange(value)
//           }} />
//         )
//       })
//     }
//   </div>
//    )
// }