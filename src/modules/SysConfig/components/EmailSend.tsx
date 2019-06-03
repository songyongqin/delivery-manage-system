import * as  React from 'react'
import {
  Popconfirm,
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Switch,
  Modal,
  Popover,
  message as Message
} from 'antd'
import classnames from 'classnames'
import Table from 'domainComponents/Table'
import columnsCreator from 'domainUtils/columnsCreator'
import { portReg } from 'utils/tools'
import Spin from 'domainComponents/Spin'
import { EARLY_WARNING_EMAIL_SEND_NAMESPACE } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'

export const REFERENCE_EMAIL_TITLE = "查看发送邮件服务器地址与端口填写参考";

const EMAIL_TYPE_DATAINDEXES = "type",
  SNED_SERVER_DATAINDEXES = "sendServer",
  SERVER_PORT_DATAINDEXES = "port",
  SERVER_PORT_SSL_DATAINDEXES = "sslPort";

const TIP = "推荐您使用 SSL 加密连接，更加安全，使用时请注意加密端口是否已在您的本地电脑和网络中开放";

export const referTableDataIndexes = [
  EMAIL_TYPE_DATAINDEXES,
  SNED_SERVER_DATAINDEXES,
  SERVER_PORT_DATAINDEXES,
  SERVER_PORT_SSL_DATAINDEXES,
]

const refEmailList = [
  {
    "type": "QQ邮箱",
    "sendServer": "smtp.qq.com",
    "port": "25",
    "sslPort": "465/587"
  },
  {
    "type": "腾讯企业邮箱",
    "sendServer": "smtp.exmail.qq.com",
    "port": "25",
    "sslPort": "465"
  },
  {
    "type": "阿里云邮箱",
    "sendServer": "smtp.aliyun.com",
    "port": "25",
    "sslPort": "465"
  },
  {
    "type": "阿里云企业邮箱",
    "sendServer": "smtp.mxhichina.com",
    "port": "25",
    "sslPort": "465/995/993"
  },
  {
    "type": "新浪邮箱",
    "sendServer": "smtp.sina.com",
    "port": "25",
    "sslPort": "465/587"
  },
  {
    "type": "163邮箱",
    "sendServer": "smtp.163.com",
    "port": "25",
    "sslPort": "465/994"
  },
  {
    "type": "126邮箱",
    "sendServer": "smtp.126.com",
    "port": "25",
    "sslPort": "465/994"
  },
  {
    "type": "网易企业邮箱",
    "sendServer": "smtp.qiye.163.com",
    "port": "25",
    "sslPort": "994"
  },
  {
    "type": "雅虎邮箱",
    "sendServer": "smtp.mail.yahoo.com",
    "port": "25",
    "sslPort": "465/587"
  }
]

export const referenceEmailTextConfig = {
  data: refEmailList,
  title: {
    [EMAIL_TYPE_DATAINDEXES]: "邮箱",
    [SNED_SERVER_DATAINDEXES]: "发送服务地址",
    [SERVER_PORT_DATAINDEXES]: "服务器端口(非加密)",
    [SERVER_PORT_SSL_DATAINDEXES]: "服务器端口(SSL加密)"
  },
  tip: TIP,
  referenceEmailTitle: "发送邮件服务器地址与端口填写参考"
}


const getColumns = () => {
  return columnsCreator({
    dataIndexes: referTableDataIndexes,
    titleConfig: referenceEmailTextConfig.title,
  })
}

const getReferTable = ({ isDark }) => {

  const tableProps = {
    columns: getColumns(),
    dataSource: refEmailList.map((i, index) => {
      return {
        ...i,
        key: `${index}-reference`
      }
    })
  }
  return <Table tableProps={tableProps}
    isDark={isDark}
    pagination={false} />
}

const getModalContent = ({ isDark }) => {
  return <div>
    {getReferTable({ isDark })}
    <p className={isDark ? "lbl-dark" : null}>
      <span style={{ color: "red" }}>*</span>
      {referenceEmailTextConfig.tip}
    </p>
  </div>
}

const FormItem = Form.Item
// const portReg = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/

class SendForm extends React.Component<any, any> {
  state = {
    visible: false
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { onSubmit, form } = this.props
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      values.ssl = values.ssl ? 1 : 0
      onSubmit && onSubmit(values)
    });
  }
  handleTest = (e) => {
    e.preventDefault();
    const { onTest, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      values.ssl = values.ssl ? 1 : 0;
      onTest && onTest(values);
    });
  }
  switchModal = () => {
    this.setState({
      visible: !this.state.visible
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { isDark, loading, defaultValue = {} } = this.props
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
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
      },
    }

    const lblClasses = classnames({
      ["lbl-dark"]: isDark
    })

    const modalClasses = classnames({
      ["modal"]: true,
      ["modal-dark"]: isDark,
    })
    return (
      <Form style={{ maxWidth: "650px", paddingTop: "15px" }}>
        <FormItem
          required={false}
          {...formItemLayout}
          colon={false}
          label={<span className={lblClasses}>用户名</span>}
        >
          {getFieldDecorator('emailUserAccount', {
            initialValue: defaultValue.emailUserAccount,
            rules: [
              {
                required: true, message: '用户名不能为空',
              },
            ],
          })(
            <Input disabled={loading} />
          )}
        </FormItem>
        <FormItem
          required={false}
          colon={false}
          {...formItemLayout}
          label={<span className={lblClasses}>密码</span>}
        >
          {getFieldDecorator('emailUserPassword', {
            initialValue: defaultValue.emailUserPassword,
            rules: [
              {
                required: true, message: '密码不能为空',
              },
            ],
          })(
            <Input disabled={loading} autoComplete ={ 'new-password' }
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
            initialValue: defaultValue.sender,
            rules: [
              {
                required: true, message: '发件人不能为空',
              },
            ],
          })(
            <Input disabled={loading} />
          )}
        </FormItem>
        <FormItem
          style={{ position: 'relative' }}
          required={false}
          {...formItemLayout}
          colon={false}
          label={<span className={lblClasses}>
            发送服务器地址&nbsp;
            <Tooltip title={referenceEmailTextConfig.referenceEmailTitle}>
              <a onClick={this.switchModal} >
                <Icon type="question-circle-o" style={{ color: "#108ee9" }} />
              </a>
            </Tooltip>
          </span>}>
          {getFieldDecorator('sendServer', {
            initialValue: defaultValue.sendServer,
            rules: [
              {
                required: true, message: '发送服务器不能为空',
              },
            ],
          })(
            <Input disabled={loading} />
          )}

        </FormItem>
        <FormItem
          required={false}
          {...formItemLayout}
          colon={false}
          label={<span className={lblClasses}>邮件服务器发送端口</span>}
        >
          {getFieldDecorator('port', {
            initialValue: defaultValue.port,
            rules: [
              {
                required: true, message: '端口不能为空',
              },
              {
                pattern: portReg, message: "请输入正确的端口号"
              }
            ],
          })(
            <Input disabled={loading} />
          )}
        </FormItem>
        <FormItem {...formItemLayout}
          colon={false}
          label={<span className={lblClasses}>SSL加密传输</span>}>
          {getFieldDecorator('ssl', {
            initialValue: defaultValue.ssl === 1,
            valuePropName: "checked"
          })(
            <Switch checkedChildren={"开"}
              unCheckedChildren={"关"}
              disabled={loading} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>

          <Popconfirm title={
            <p>
              请先测试邮件服务器，若发送邮件服务器未连接成功，
              <br />
              则会导致发件箱无法发送告警邮件
            </p>
          }
            onConfirm={this.handleSubmit}>
            <Button type="primary"
              loading={loading}
              icon="save"
              style={{ marginRight: "10px" }}>
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
            <span style={{ color: "red" }}>*</span>&nbsp;
            仅支持配置smtp协议的发件箱
          </p>
        </FormItem>
        <Modal visible={this.state.visible}
          width={800}
          className={modalClasses}
          onCancel={this.switchModal}
          footer={null}
          title={referenceEmailTextConfig.referenceEmailTitle}>
          {getModalContent({ isDark })}
        </Modal>
      </Form>
    )
  }
}


const WrappedForm: any = Form.create()(SendForm)

const mapStateToProps = state => {
  const effectsLoading = state.loading.effects
  return {
    loading: effectsLoading[`${EARLY_WARNING_EMAIL_SEND_NAMESPACE}/put`] ||
      effectsLoading[`${EARLY_WARNING_EMAIL_SEND_NAMESPACE}/fetch`] ||
      effectsLoading[`${EARLY_WARNING_EMAIL_SEND_NAMESPACE}/test`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    put: payload => dispatch({
      type: `${EARLY_WARNING_EMAIL_SEND_NAMESPACE}/put`,
      payload,
    }),
    fetch: payload => dispatch({
      type: `${EARLY_WARNING_EMAIL_SEND_NAMESPACE}/fetch`,
      payload
    }),
    test: payload => dispatch({
      type: `${EARLY_WARNING_EMAIL_SEND_NAMESPACE}/test`,
      payload
    })
  }
}


@extraConnect(mapStateToProps, mapDispatchToProps)
export default class EmailSend extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      data: {
        emailUserAccount: "",
        emailPassword: "",
        port: "",
        sendServer: "",
        sender: "",
        ssl: 0
      },
      lastReqTime: 0
    }
  }
  componentDidMount() {
    this.fetchData()
  }
  fetchData = () => {
    this.props.fetch().then(res => {
      this.setState({
        data: res,
        lastReqTime: new Date().getTime()
      })
    })
  }
  put = payload => this.props.put(payload)
    .then(_ => {
      Message.success("保存设置成功")
    })
  test = payload => this.props.test(payload)
    .then(_ => {
      Message.success("邮件服务器连接成功，可正常发送邮件")
    })
  render() {
    const { loading } = this.props
    const { data } = this.state
    console.log(data)
    return (
      <Spin spinning={loading}>
        <WrappedForm
          defaultValue={data}
          onTest={this.test}
          key = { this.state.lastReqTime }
          onSubmit={this.put}>
        </WrappedForm>
      </Spin>
    )
  }
}