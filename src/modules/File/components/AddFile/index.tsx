import * as React from 'react'
const styles = require("./styles.less")
import extraConnect from 'domainUtils/extraConnect'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
import { USER_NAMESPACE } from 'constants/model'
import {Modal, Icon, Form, Input, Button, message as Message, Select, Upload} from 'antd'
const {Item} = Form
const {Option} = Select
const { TextArea } = Input;
import reqwest from 'reqwest';
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http



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
class AddFile extends React.Component<any, any> {

  state = {
    fileList: [],
    uploading: false,
  }

  handleOk = () => {
    this.props.closeAddPop()
  }
  handleCancel = () => {
    this.props.closeAddPop()
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

  change = e =>{
    console.log('change', e)
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
        formData.append('fileName', values.fileName);
      }
    })
    this.setState({
      uploading: true,
    });
    reqwest({
      url: httpApi.FILE_ADD,
      method: 'post',
      processData: false,
      'Content-Type': 'multipart/form-data',
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        this.props.closeAddPop()
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

    const {addPopVisible} = this.props
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
            <span>新建文档类型</span>
          </div>
        }
        footer = {null}
        visible={addPopVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Item  label="文档名称">
            {getFieldDecorator('fileName', {
              rules: [{ required: true, message: '请输入文档名称'}],
              initialValue: "",
            })(<Input />)}
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
              <Upload {...upload} onChange={ this.change } multiple  >
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
export default Form.create()(AddFile)
