import * as React from 'react'
const styles = require("./styles.less")
import { PROJECT_DETAIL_NAMESPACE } from 'constants/model'
import {Modal, Form, Input, Button, Select, Icon, DatePicker, Upload, message as Message, Popover, Checkbox  } from 'antd'
const {Item} = Form
const {Option} = Select
const { TextArea } = Input;
import moment from 'moment'
import extraConnect from 'domainUtils/extraConnect'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
import tranformTime from 'utils/tranformTime'
import reqwest from 'reqwest'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

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
class ApplicationTestingUpd extends React.Component<any, any> {

  state = {
    fileList: [],
    uploading: false,
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
        this.handleUpload(values)
      }
    });
  }
  handleUpload = (values) => {
    const { fileList } = this.state;
    const formData = new FormData();
    let arr = []
    for(let i =0; i<fileList.length; i++){
      formData.append('files', fileList[i])
    }
    formData.append('id', this.props.data.id)
    formData.append('pid', this.props.data.pid)
    formData.append('cid', this.props.data.cid)
    formData.append('orderType', values.orderType)
    let theDateOfIssuance = moment(values.theDateOfIssuance, 'YYYY-MM-DD').valueOf()
    formData.append('theDateOfIssuance', theDateOfIssuance.toString())
    formData.append('authorizedTimeLimit', values.authorizedTimeLimit)
    formData.append('deliveryMode', values.deliveryMode)
    let dateOfApplication = moment(values.dateOfApplication, 'YYYY-MM-DD').valueOf()
    formData.append('dateOfApplication', dateOfApplication.toString())
    formData.append('remarks', values.remarks)
    formData.append('enclosures', values.uploadFile)
    this.setState({
      uploading: true,
    });
    reqwest({
      url: httpApi.PROJECT_DETAIL_SCANNING,
      method: 'put',
      processData: false,
      'Content-Type': 'multipart/form-data',
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        this.props.closePop()
        this.props.getTable()
        Message.success('修改成功');
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        Message.error('修改失败');
      },
    });
  };
  render() {
    const {popVisible} = this.props
    const { uploading, fileList } = this.state
    const {orderType, theDateOfIssuance, authorizedTimeLimit, deliveryMode, dateOfApplication, remarks, enclosures=[]} = this.props.data
    let initArr = []
    enclosures.map(el => {
      initArr.push(el.id)
    })
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
    const upload = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    }
    return (
      <Modal
        destroyOnClose = {true}
        title={
          <div>
            <Icon type='plus'/>
            <span>修改文档</span>
          </div>
        }
        footer = {null}
        visible={popVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Item  label="订单类型">
            {getFieldDecorator('orderType', {
              rules: [{ required: true, message: '请输入订单类型'}],
              initialValue: orderType,
            })(<Input />)}
          </Item>
          <Item  label="要求发货日期">
            {getFieldDecorator('theDateOfIssuance', {
              rules: [{ required: true, message: '请输入要求发货日期'}],
              initialValue:moment(theDateOfIssuance)
            })(<DatePicker />)}
          </Item>
          <Item  label="授权时限">
            {getFieldDecorator('authorizedTimeLimit', {
              rules: [{ required: true, message: '请输入授权时限'}],
              initialValue: authorizedTimeLimit,
            })(<Input />)}
          </Item>
          <Item  label="交付方式">
            {getFieldDecorator('deliveryMode', {
              rules: [{ required: true, message: '请输入交付方式'}],
              initialValue: deliveryMode,
            })(<Input />)}
          </Item>
          <Item  label="要求申请日期">
            {getFieldDecorator('dateOfApplication', {
              rules: [{ required: true, message: '请输入要求申请日期'}],
              initialValue:moment(dateOfApplication)
            })(<DatePicker />)}
          </Item>
          <Item  label="备注">
            {getFieldDecorator('remarks', {
              initialValue: remarks,
            })(<TextArea rows={4} />)}
          </Item>
          <Item  label="已上传附件">
            {getFieldDecorator('uploadFile', {
              initialValue: initArr
            })(
              <UploadList enclosures={ enclosures }/>
            )}
          </Item>
          <Item  label="上传附件">
            {getFieldDecorator('uploadFiles', {
              rules: [{ required: true, message: '请上传附件',
              validator: (rule, value, cb)=>{
                let files= this.props.form.getFieldValue('uploadFile')
                if(files.length||value&&value.fileList&&value.fileList.length){
                  cb()
                }
                else cb(rule.message)
              }  
            }],
              initialValue: "",
            })(
              <Upload {...upload} >
                <Button>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>
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
export default Form.create()(ApplicationTestingUpd)

class UploadList extends React.Component<any,any>{
  render(){
    const { enclosures, onChange, value = []} = this.props
    return(
      <div>
        {
          enclosures.map((el,index) => {
            const content = <img style={{width:500,height:500}} src={el.enclosure}></img>
            return (
              <div key = {index}>
                <Popover title={null} content={content}>
                  <img src={el.enclosure} style={{width:20, height: 20}}></img>
                </Popover>
                <Checkbox defaultChecked onChange={e => {
                  let add = e.target.checked
                  let arr = add ? [...value, el.id] : value.filter(i => i!== el.id)
                  onChange(arr)
                }} ></Checkbox>
              </div>
            )
          })
        }
      </div>
    )
  }
}