import * as React from 'react'
import { Input, Row, Col, Button, Tooltip, message as Message, Spin, Switch, Checkbox } from 'antd'
import { Form, Icon } from 'antd'
import {
  OPEN_DATA_INDEX,
  CONNECT_CLOUD_DATA_INDEX
} from '../../constants'
import classnames from 'classnames'
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
import { ipReg, portReg } from 'utils/tools'
import extraConnect from 'domainUtils/extraConnect'
import Card from 'domainComponents/Card'
import { SYS_CONFIG_CLOUD_DETECTION_NAMESPACE } from 'constants/model'
import { When, Otherwise, Choose } from 'components/ControlStatements'


class WrappedForm extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      showInfo: props.defaultValue[OPEN_DATA_INDEX]
    }
  }
  remove = (index) => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    form.setFieldsValue({
      keys: keys.filter((key, i) => index !== i),
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, onSubmit } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      values = { ...values }
      values[OPEN_DATA_INDEX] = values[OPEN_DATA_INDEX] ? 1 : 0
      onSubmit && onSubmit(values)
    });
  };
  ipCheck = (rule, value, callback) => {
    if (ipReg.test(value)) {
      return callback()
    }
    callback("请输入正确的IP")
  }
  portCheck = (rule, value, callback) => {
    if (portReg.test(value)) {
      return callback()
    }
    callback("请输入正确的端口")
  }
  onSwitchChange = (value) => {
    const { onSubmit } = this.props
    onSubmit && onSubmit({
      [OPEN_DATA_INDEX]: value ? 1 : 0
    })
    this.setState({
      showInfo: value
    })
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { defaultValue = {}, isDark, loading, isAdmin } = this.props;
    const formItemLayout = {
      labelCol: {
        span: 12,
      },
      wrapperCol: {
        span: 12,
      },
    }

    const lblClasses = classnames({
      ["lbl-dark"]: isDark,
    })


    const statusContent = defaultValue[CONNECT_CLOUD_DATA_INDEX] === 1
      ?
      <p style={{ color: "#00a854" }}>
        设备可连接到云检测服务器，云检测功能正常运行
      </p>
      :
      <p style={{ color: "#f04134" }}>
        设备无法连接到云检测服务器，无法上传数据到云服务器
      </p>

    const formContent = (
      <Form style={{ width: "800px" }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ float: "left", height: "40px", lineHeight: "40px" }}>
            <FormItem
              {...formItemLayout}
              style={{ width: "240px" }}
              colon={false}
              label={<span className={lblClasses}>
                云检测功能
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>}>
              {getFieldDecorator(OPEN_DATA_INDEX, {
                initialValue: defaultValue[OPEN_DATA_INDEX] === 1,
                valuePropName: "checked"
              })(
                <Switch checkedChildren={loading ? <Icon type="loading"></Icon> : "开启"}
                  onChange={this.onSwitchChange}
                  unCheckedChildren={loading ? <Icon type="loading"></Icon> : "禁用"}
                  disabled={loading} />
              )}
            </FormItem>
          </div>
          <div style={{ float: "left", height: "40px", lineHeight: "40px" }}>
            {/* <FormItem wrapperCol={{ span: 4 }}
              colon={false}>
              <Button type="primary"
                loading={loading}
                icon="save"
                size="default"
                onClick={this.handleSubmit}
              >保存</Button>
            </FormItem> */}
          </div>
        </div>
        <Choose>
          <When condition={loading && this.state.showInfo}>
            <Icon type="loading"></Icon>
          </When>
          <When condition={this.state.showInfo}>
            {statusContent}
          </When>
        </Choose>
      </Form>
    )
    return formContent

  }
}

const CloudDetectionForm: any = Form.create()(WrappedForm)

// export default FinalForm

const CloudDetectionContent = ({ data, isDark, loading, onSubmit }) => {
  return <Card
    title={
      <p>
        云检测功能
        &nbsp;
      <Tooltip title="此功能需要连接到云检测服务器，请确保设备可连接到云检测服务器">
          <a style={{ color: "#108ee9" }}>
            <Icon type="question-circle-o" />
          </a>
        </Tooltip>
      </p>
    } style={{ marginBottom: "15px" }}>
    <CloudDetectionForm
      onSubmit={onSubmit}
      loading={loading}
      isDark={isDark}
      defaultValue={data}>
    </CloudDetectionForm>
  </Card>
}


@extraConnect(
  state => {
    const effectsLoading = state.loading.effects
    return {
      loading: effectsLoading[`${SYS_CONFIG_CLOUD_DETECTION_NAMESPACE}/fetch`] ||
        effectsLoading[`${SYS_CONFIG_CLOUD_DETECTION_NAMESPACE}/put`]
    }
  },
  dispatch => {
    return {
      fetch: _ => dispatch({
        type: `${SYS_CONFIG_CLOUD_DETECTION_NAMESPACE}/fetch`,
      }),
      put: payload => dispatch({
        type: `${SYS_CONFIG_CLOUD_DETECTION_NAMESPACE}/put`
      })
    }
  }
)
export default class extends React.Component<any, any>{
  state = {
    data: {},
    initial: false
  }
  componentDidMount() {
    this.fetchData()
  }
  fetchData = () => {
    this.props.fetch().then(res => this.setState({ data: res, initial: true }))
  }
  onSubmit = payload => {
    this.props.put(payload)
      .then(_ => Message.success("保存成功"))
      .then(this.fetchData)
  }
  render() {

    const { onSubmit } = this
    const { loading } = this.props
    const { data, initial } = this.state

    return (
      <Card
        title={
          <div>
            <Icon type="cloud-o"></Icon> &nbsp;云检测功能&nbsp;&nbsp;
            <Tooltip title="此功能需要连接到云检测服务器，请确保设备可连接到云检测服务器">
              <a style={{ color: "#108ee9" }}>
                <Icon type="question-circle-o" />
              </a>
            </Tooltip>
          </div>
        } style={{ marginBottom: "15px" }}>
        <Choose>
          <When condition={initial}>
            <CloudDetectionForm
              onSubmit={onSubmit}
              loading={loading}
              defaultValue={data}>
            </CloudDetectionForm>
          </When>
          <Otherwise>
            <Icon type="loading"></Icon>
          </Otherwise>
        </Choose>
      </Card>
    )
  }
}