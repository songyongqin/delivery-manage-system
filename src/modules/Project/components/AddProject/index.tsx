import * as React from 'react'
const styles = require("./styles.less")
import extraConnect from 'domainUtils/extraConnect'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
import { PROJECT_NAMESPACE } from 'constants/model'
import {Modal, Icon, Form, Input, Button, message as Message, Select, DatePicker, Popconfirm } from 'antd'
const {Item} = Form
const {Option} = Select
const { TextArea } = Input
import moment from 'moment'



const mapStateToProps = state => {
  return {
    state,
    loading: state.loading.effects[`${PROJECT_NAMESPACE}/addUser`]
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addProject: payload => dispatch({
      type: `${PROJECT_NAMESPACE}/addProject`,
      payload
    }),
  }
}

@extraConnect(mapStateToProps, mapDispatchToProps)
@WithAnimateRender
@WithCommonProps
class AddProject extends React.Component<any, any> {

  state = {
    products:[1]
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
        let reqObj = {}
        let keyArr = Object.keys(values)
        let products = []
        let len = this.state.products.length
        for(let i=0;i<len;i++) {
          products.push({})
          for(let j=0; j< keyArr.length;j++) {
            if(keyArr[j].lastIndexOf(i.toString()) !== -1 ){
              let key = keyArr[j].substring(0,keyArr[j].length-1)
              products[i][key] = values[keyArr[j]]
            }
          }
        }
        for(let i=0;i<keyArr.length;i++) {
          let len = keyArr[i].length
          let key = keyArr[i].substring(len-1,len)
          if(Number(key).toString() === 'NaN') {
            reqObj[keyArr[i]] = values[keyArr[i]]
          }
        }
        reqObj['products'] = products
        let time = moment(values.projectStartTime, 'YYYY-MM-DD').valueOf();
        reqObj['projectStartTime'] = time
        this.props.addProject(reqObj)
        .then(_ => {
          this.props.closePop()
          this.props.getTable()
          Message.success('添加成功');
        })
      }
    });
  }
  handleReset = () => {
    this.props.form.resetFields()
  }
  addItems = () => {
    let products = [...this.state.products,1]
    this.setState({products})
  }
  delItems = () => {
    if(this.state.products.length>0){
      let arr = this.state.products
      arr.splice(0,1)
      this.setState({products:arr})
    }
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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      }
    }
    const {products} = this.state
    const dateFormat = 'YYYY/MM/DD';
    return (
      <Modal
        destroyOnClose = {true}
        title={
          <div>
            <Icon type='plus'/>
            <span>创建项目</span>
          </div>
        }
        footer = {null}
        visible={popVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Item  label="项目名称">
            {getFieldDecorator('projectName', {
              rules: [{ required: true, message: '请输入项目名称'}],
              initialValue: "",
            })(<Input />)}
          </Item>
          <Item  label="项目负责人">
            {getFieldDecorator('chargeName', {
              rules: [{ required: true, message: '请输入项目负责人'}],
              initialValue: "",
            })(<Input />)}
          </Item>
          <Item  label="客户名称">
            {getFieldDecorator('customerName', {
              rules: [{ required: true, message: '请输入客户名称'}],
              initialValue: "",
            })(<Input />)}
          </Item>          
          {
            products.map((el, index) => {
              return (
                <div key={index}>
                  <Item  label="产品名称">
                    {getFieldDecorator('productName'+index, {
                      initialValue: "",
                    })(<Input />)}
                  </Item>
                  <Item  label="产品版本号">
                    {getFieldDecorator('productVersion'+index, {
                      initialValue: "",
                    })(<Input />)}
                  </Item>
                  <Item  label="设备id">
                    {getFieldDecorator('deviceID'+index, {
                      initialValue: "",
                    })(<Input />)}
                  </Item>
                  <Item  label="产品编号">
                    {getFieldDecorator('productNumber'+index, {
                      initialValue: "",
                    })(<Input />)}
                  </Item>
                  <Item  label="产品状态">
                    {getFieldDecorator('productState'+index, {
                      initialValue: "",
                    })(
                        <Select>
                          <Option value={1}>硬件采购</Option>
                          <Option value={2}>灌装测试</Option>
                          <Option value={3}>产品检验</Option>
                          <Option value={4}>出货</Option>
                        </Select>
                    )}
                  </Item>
                </div>
              )
            })
          }
          <Item>
            <div className={styles['handleItems']}>
              <span className={styles['addItems']} onClick={this.addItems}></span>
              <span className={styles['delItems']} onClick={this.delItems}></span>
            </div>
          </Item>
          <Item  label="项目开始时间">
            {getFieldDecorator('projectStartTime', {
              initialValue:moment('2015/01/01', 'YYYY-MM-DD')
            })(<DatePicker />)}
          </Item>
          <Item  label="项目状态">
            {getFieldDecorator('projectState', {
              rules: [{ required: true}],
              initialValue: 1,
            })(
              <Select>
                <Option value={1}>进行中</Option>
                <Option value={2}>售后</Option>
              </Select>
            )}
          </Item>
          <Item  label="备注">
            {getFieldDecorator('remarks', {
              initialValue: "",
            })(<TextArea rows={4} />)}
          </Item>
          <Item {...tailFormItemLayout}>
            <Button  type="primary"
                size="small"
                style={{ borderRadius: "5px", width: "70px" }}
                htmlType="submit">
                保存
            </Button>
            <Popconfirm
              title="确认重置吗?"
              onConfirm={this.handleReset}
              okText="Yes"
              cancelText="No"
            >
              <Button
                  size="small"
                  style={{ borderRadius: "5px", width: "70px",marginLeft: 20 }}
                  >
                  重置
              </Button>
            </Popconfirm>
          </Item>
        </Form>
      </Modal>
    )
  }
}
export default Form.create()(AddProject)




