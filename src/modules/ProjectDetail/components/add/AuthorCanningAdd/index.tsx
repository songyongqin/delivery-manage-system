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
import {getTime} from 'utils/getTime'
import { getToken } from 'domain/user'
import { HTTP_HEADERS_TOKEN_DATA_INDEX } from 'constants/user'


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
class AuthorCanningAdd extends React.Component<any, any> {

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
        formData.append('orderType', values.orderType)
        // let theDateOfIssuance = moment(values.theDateOfIssuance*1000, 'YYYY-MM-DD').valueOf()
        // formData.append('theDateOfIssuance', theDateOfIssuance.toString())
        let theDateOfIssuance = getTime(values.theDateOfIssuance)
        formData.append('theDateOfIssuance', theDateOfIssuance)
        formData.append('authorizedTimeLimit', values.authorizedTimeLimit)
        formData.append('deliveryMode', values.deliveryMode)
        // let dateOfApplication = moment(values.dateOfApplication*1000, 'YYYY-MM-DD').valueOf()
        // formData.append('dateOfApplication', dateOfApplication.toString())
        let dateOfApplication = getTime(values.dateOfApplication)
        formData.append('dateOfApplication', dateOfApplication)
        formData.append('remarks', values.remarks)
      }
    })
    this.setState({
      uploading: true,
    });
    reqwest({
      url: httpApi.PROJECT_DETAIL_SCANNING,
      method: 'post',
      processData: false,
      'Content-Type': 'multipart/form-data',
      headers:{
        [HTTP_HEADERS_TOKEN_DATA_INDEX]: getToken(),
      },
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
            <span>新增灌装后授权单</span>
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
              initialValue: "",
            })(<Input />)}
          </Item>
          <Item  label="要求发货日期">
            {getFieldDecorator('theDateOfIssuance', {
              rules: [{ required: true, message: '请输入要求发货日期'}],
            })(<DatePicker />)}
          </Item>
          <Item  label="授权时限">
            {getFieldDecorator('authorizedTimeLimit', {
              rules: [{ required: true, message: '请输入授权时限'}],
              initialValue: "",
            })(<Input placeholder="例如：1年" />)}
          </Item>
          <Item  label="交付方式">
            {getFieldDecorator('deliveryMode', {
              rules: [{ required: true, message: '请输入交付方式'}],
              initialValue: "",
            })(<Input />)}
          </Item>
          <Item  label="申请日期">
            {getFieldDecorator('dateOfApplication', {
              rules: [{ required: true, message: '请输入申请日期'}],
            })(<DatePicker />)}
          </Item>
          <Item  label="备注">
            {getFieldDecorator('remarks', {
              initialValue: "",
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
                  <Icon type="upload" /> 上传附件
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
export default Form.create()(AuthorCanningAdd)
