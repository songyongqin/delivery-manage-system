import React from 'react';
import {Popconfirm, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Switch,Modal,Popover } from 'antd';
import classnames from 'classnames';
import styles from './styles.css';
import {referenceEmailTextConfig,referTableDataIndexes} from '../../ConstConfig';
import EnhanciveTable from '../../../../domainComponents/EnhanciveTable/index';
import tableColumsGenerator from '../../../../utils/tableColumnsGenerator'

const getColumns=()=>{
  return tableColumsGenerator({
    keys:referTableDataIndexes,
    titleTextConfig:referenceEmailTextConfig.title,
  })
}

const getReferTable=({isDark})=>{

  const tableProps={
    columns:getColumns(),
    dataSource:referenceEmailTextConfig.data.map((i,index)=>{
      return {
        ...i,
        key:`${index}-reference`
      }
    })
  }
  return <EnhanciveTable tableProps={tableProps}
                         isDark={isDark}
                         pagination={false}/>
}

const getModalContent=({isDark})=>{
  return <div>
    {getReferTable({isDark})}
    <p className={isDark?"lbl-dark":null}>
      <span style={{color:"red"}}>*</span>
      {referenceEmailTextConfig.tip}
    </p>
  </div>
}

const FormItem = Form.Item;
const portReg= /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;

@Form.create()
class WrappedForm extends React.Component {
  state={
    visible:false
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {onSubmit,form}=this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      values.ssl=values.ssl?1:0;
      onSubmit&&onSubmit(values);
    });
  }
  handleTest = (e) => {
    e.preventDefault();
    const {onTest,form}=this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      values.ssl=values.ssl?1:0;
      onTest&&onTest(values);
    });
  }
  switchModal=()=>{
    this.setState({
      visible:!this.state.visible
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {isDark,loading,defaultValue}=this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
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
      },
    };

    const lblClasses=classnames({
      ["lbl-dark"]:isDark
    })

    const modalClasses=classnames({
      ["modal"]:true,
      ["modal-dark"]:isDark,
    })

    return (
      <Form style={{maxWidth:"650px",paddingTop:"15px"}}>
        <FormItem
          required={false}
          {...formItemLayout}
          colon={false}
          label={<span className={lblClasses}>用户名</span>}
        >
          {getFieldDecorator('emailUserAccount', {
            initialValue:defaultValue.emailUserAccount,
            rules: [
              {
                required: true, message: '用户名不能为空',
              },
            ],
          })(
            <Input disabled={loading}/>
          )}
        </FormItem>
        <FormItem
          required={false}
          colon={false}
          {...formItemLayout}
          label={<span className={lblClasses}>密码</span>}
        >
          {getFieldDecorator('emailUserPassword', {
            initialValue:"",
            rules: [
              {
                required: true, message: '密码不能为空',
              },
            ],
          })(
            <Input disabled={loading}
                   type="password" />
          )}
        </FormItem>
        <FormItem
          required={false}
          {...formItemLayout}
          colon={false}
          label={<span className={lblClasses}>发件人</span>}
        >
          {getFieldDecorator('sender', {
            initialValue:defaultValue.sender,
            rules: [
              {
                required: true, message: '发件人不能为空',
              },
            ],
          })(
            <Input disabled={loading}/>
          )}
        </FormItem>
        <FormItem
          style={{position:'relative'}}
          required={false}
          {...formItemLayout}
          colon={false}
          label={<span className={lblClasses}>发送服务器地址&nbsp;</span>}>
          {getFieldDecorator('sendServer', {
            initialValue:defaultValue.sendServer,
            rules: [
              {
                required: true, message: '发送服务器不能为空',
              },
            ],
          })(
            <Input disabled={loading} />
          )}
          <Tooltip title={referenceEmailTextConfig.referenceEmailTitle}>
            <a onClick={this.switchModal} style={{position:"absolute",right:"-25px"}}>
              <Icon type="question-circle-o"/>
            </a>
          </Tooltip>
        </FormItem>
        <FormItem
          required={false}
          {...formItemLayout}
          colon={false}
          label={<span className={lblClasses}>邮件服务器发送端口</span>}
        >
          {getFieldDecorator('port', {
            initialValue:defaultValue.port,
            rules: [
              {
                pattern:portReg,message:"请输入正确的端口号"
              }
            ],
          })(
            <Input disabled={loading} placeholder="自动匹配"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout}
                  colon={false}
                  label={<span className={lblClasses}>SSL加密传输</span>}>
          {getFieldDecorator('ssl', {
            initialValue:defaultValue.ssl===1,
            valuePropName:"checked"
          })(
            <Switch checkedChildren={"开"}
                    unCheckedChildren={"关"}
                    disabled={loading}/>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>

          <Popconfirm title={
            <p>
              请先测试邮件服务器，若发送邮件服务器未连接成功，
              <br/>
              则会导致发件箱无法发送告警邮件
            </p>
          }
                      onConfirm={this.handleSubmit}>
            <Button type="primary"
                    loading={loading}
                    size="large"
                    icon="save"
                    style={{marginRight:"10px"}}>
              保存
            </Button>
          </Popconfirm>
          <Button type="primary"
                  onClick={this.handleTest}
                  loading={loading}
                  icon="mail">测试邮件服务</Button>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <p className={lblClasses}>
            <span style={{color:"red"}}>*</span>&nbsp;
            仅支持配置smtp协议的发件箱
          </p>
        </FormItem>
        <Modal visible={this.state.visible}
               width={800}
               className={modalClasses}
               onCancel={this.switchModal}
               footer={null}
               title={referenceEmailTextConfig.referenceEmailTitle}>
          {getModalContent({isDark})}
        </Modal>
      </Form>
    );
  }
}

export default WrappedForm;
