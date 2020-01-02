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
    formData.append('salesman', values.salesman)
    formData.append('remarks', values.remarks)
    let deploymentTime = moment(values.deploymentTime, 'YYYY-MM-DD').valueOf()
    formData.append('deploymentTime', deploymentTime.toString())
    let authorityExpirationTime = moment(values.authorityExpirationTime, 'YYYY-MM-DD').valueOf()
    formData.append('authorityExpirationTime', authorityExpirationTime.toString())
    formData.append('enclosures', values.uploadFile)
    this.setState({
      uploading: true,
    });
    reqwest({
      url: httpApi.PROJECT_DETAIL_TEST,
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
    const {salesman, authorityExpirationTime, deploymentTime, remarks, enclosures=[]} = this.props.data
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
          <Item  label="销售人员">
            {getFieldDecorator('salesman', {
              rules: [{ required: true, message: '请输入销售人员'}],
              initialValue: salesman,
            })(<Input />)}
          </Item>
          <Item  label="部署时间">
            {getFieldDecorator('deploymentTime', {
              rules: [{ required: true, message: '请输入部署时间'}],
              initialValue:moment(deploymentTime*1000)
            })(<DatePicker />)}
          </Item>
          <Item  label="授权到期时间">
            {getFieldDecorator('authorityExpirationTime', {
              rules: [{ required: true, message: '请输入授权到期时间'}],
              initialValue:moment(authorityExpirationTime*1000)
            })(<DatePicker />)}
          </Item>
          <Item  label="备注">
            {getFieldDecorator('remarks', {
              initialValue: remarks,
            })(<TextArea rows={4} />)}
          </Item>
          <Item  label="已上传附件">
            {getFieldDecorator('uploadFile', {
              initialValue: enclosures
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
            const content = <img style={{width:500,height:500}} src={el}></img>
            return (
              <div key = {index}>
                <Popover title={null} content={content}>
                  <img src={el} style={{width:20, height: 20}}></img>
                </Popover>
                <Checkbox defaultChecked onChange={e => {
                  let add = e.target.checked
                  let arr = add ? [...value, el] : value.filter(i => i!== el)
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