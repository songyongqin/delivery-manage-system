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
class DeliveryTestingAdd extends React.Component<any, any> {

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
        formData.append('expirationDate', values.expirationDate)
        formData.append('examiner', values.examiner)
        // let inspectionTime = moment(values.inspectionTime*1000, 'YYYY-MM-DD').valueOf()
        // formData.append('inspectionTime', inspectionTime.toString())
        let inspectionTime = getTime(values.inspectionTime)
        formData.append('inspectionTime', inspectionTime)
        formData.append('remarks', values.remarks)
      }
    })
    this.setState({
      uploading: true,
    });
    reqwest({
      url: httpApi.PROJECT_DETAIL_CHECKLIST,
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
            <span>新增出货检查单</span>
          </div>
        }
        footer = {null}
        visible={popVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Item  label="过期时长">
            {getFieldDecorator('expirationDate', {
              rules: [{ required: true, message: '请输入过期时长'}],
              initialValue: "",
            })(<Input />)}
          </Item>
          <Item  label="检查人">
            {getFieldDecorator('examiner', {
              rules: [{ required: true, message: '请输入检查人'}],
            })(<Input />)}
          </Item>
          <Item  label="检查时间">
            {getFieldDecorator('inspectionTime', {
              rules: [{ required: true, message: '请输入检查时间'}],
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
export default Form.create()(DeliveryTestingAdd)
