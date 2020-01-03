import * as React from 'react'
const styles = require("./styles.less")
import extraConnect from 'domainUtils/extraConnect'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
import { USER_NAMESPACE } from 'constants/model'
import {Modal, Icon, Form, Input, Button, message as Message, Select, Upload,DatePicker} from 'antd'
const {Item} = Form
const {Option} = Select
const { TextArea } = Input;
import reqwest from 'reqwest';
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http
import moment from 'moment'



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
class ApplicationTestingAdd extends React.Component<any, any> {

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
    const {fileList} = this.state
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.handleUpload()
      }
    });
  }
  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    let arr = []
    for(let i =0; i<fileList.length; i++){
      formData.append('files',fileList[i])
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        formData.append('id', this.props.id)
        formData.append('pid', this.props.pid)
        formData.append('salesman', values.salesman)
        formData.append('remarks', values.remarks)
        let deploymentTime = moment(values.deploymentTime, 'YYYY-MM-DD').valueOf()
        formData.append('deploymentTime', deploymentTime.toString())
        let authorityExpirationTime = moment(values.authorityExpirationTime, 'YYYY-MM-DD').valueOf()
        formData.append('authorityExpirationTime', authorityExpirationTime.toString())
      }
    })
    this.setState({
      uploading: true,
    });
    reqwest({
      url: httpApi.PROJECT_DETAIL_TEST,
      method: 'post',
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
        Message.success('添加成功');
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        Message.error('添加失败');
      },
    });
  };
  
  render() {
    const { uploading, fileList } = this.state

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
            <span>新增申请测试单</span>
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
              initialValue: "",
            })(<Input />)}
          </Item>
          <Item  label="部署时间">
            {getFieldDecorator('deploymentTime', {
              rules: [{ required: true, message: '请输入部署时间'}],
            })(<DatePicker />)}
          </Item>
          <Item  label="授权到期时间">
            {getFieldDecorator('authorityExpirationTime', {
              rules: [{ required: true, message: '请输入授权到期时间'}],
            })(<DatePicker />)}
          </Item>
          <Item  label="备注">
            {getFieldDecorator('remarks', {
            })(<TextArea rows={4} />)}
          </Item>
          <Item  label="上传附件">
            {getFieldDecorator('uploadFiles', {
              rules: [{ required: true, message: '请上传附件',
              validator: function(rule, value, cb){
                console.log(value)
                if(value&&value.fileList&&value.fileList.length){
                  cb()
                }
                else cb(rule.message)
              }  
            }],
              initialValue: "",
            })(
              <Upload {...upload} multiple  >
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
export default Form.create()(ApplicationTestingAdd)
