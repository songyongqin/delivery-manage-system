import * as React from 'react'
const styles = require("./styles.less")
import extraConnect from 'domainUtils/extraConnect'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
import { USER_NAMESPACE } from 'constants/model'
import {Modal, Icon, Form, Input, Button, message as Message, Select, Upload, Checkbox, Popover} from 'antd'
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
class UpdateFile extends React.Component<any, any> {

  state = {
    fileList: [],
    uploading: false,
  }

  handleOk = () => {
    this.props.closePop()
  }
  handleCancel = () => {
    this.props.closeUpdatePop()
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
    formData.append('fileName', values.fileName)
    formData.append('enclosures', values.uploadFile)
    this.setState({
      uploading: true,
    });
    reqwest({
      url: httpApi.FILE_UPDATE,
      method: 'put',
      processData: false,
      'Content-Type': 'multipart/form-data',
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        this.props.closeUpdatePop()
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
    const { uploading, fileList } = this.state
    const {updatePopVisible, data} = this.props
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
    const {fileName,id,enclosures} = this.props.data
    let initArr = []
    enclosures.map(i => initArr.push(i.id)
    )
    
    return (
      <Modal
        destroyOnClose = {true}
        title={
          <div>
            <Icon type='plus'/>
            <span>修改文档类型</span>
          </div>
        }
        footer = {null}
        visible={updatePopVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Item  label="文档名称">
            {getFieldDecorator('fileName', {
              rules: [{ required: true, message: '请输入文档名称'}],
              initialValue: fileName,
            })(<Input />)}
          </Item>
          <Item  label="已上传附件">
            {getFieldDecorator('uploadFile', {
              initialValue: initArr
            })(
              <UploadList enclosures={ enclosures }   />
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
export default Form.create()(UpdateFile)

const UploadList = (props) => {
  const { enclosures, onChange , value=[]} = props

   return (
    <div>
    {
      enclosures.map((el,index) => {
        const content = <img style={{width:500,height:500}} src={el.enclosure}></img>
        return (
          <div key = {index}>
            <Popover title={null} content={content}>
              <img src={el.enclosure} style={{width:20, height: 20}}></img>
            </Popover>
            <Checkbox value={el.id} defaultChecked   onChange={ e=> {
              let add = e.target.checked
              let arr = add ? [...value, el.id] : value.filter(i => i!== el.id)
              onChange(arr)
            } } ></Checkbox>
          </div>
        )
      })
    }
  </div>
   )
}