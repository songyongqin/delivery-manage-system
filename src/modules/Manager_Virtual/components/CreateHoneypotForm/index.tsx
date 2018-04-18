/**
 * Created by jojo on 2017/9/8.
 */

import * as React from 'react'
import {
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
  AutoComplete,
  Slider,
  Radio,
  Popover
} from 'antd';

import styles from './styles.css'
import classnames from 'classnames'
import { get } from 'utils'

import {
  HOST_IP_DATAINDEX,
  HONEYPOT_NAME_DATAINDEX,
  HONEYPOT_IP_DATAINDEX,
  INTERCATION_DATAINDEX,
  VCPUS_DATAINDEX,
  RAM_DATAINDEX,
  SYSTEM_DATAINDEX,
  SERVICES_DATAINDEX,
  GATEWAY_DATAINDEX,
  honeypotTextConfig,
  AUTH_DATAINDEX,
  AUTH_USER_DATA_INDEX,
  AUTH_PASSWORD_DATA_INDEX,

  LOW_DATA_INDEX,
  HIGH_DATA_INDEX,
  SYSTEM_LIST_DATA_INDEX,
  WINDOW_SERVER_TYPE,
  LINUX_SERVER_TYPE,
  SERVICE_LIST_DATA_INDEX,
} from '../../constants'

// import {
//   interactions,
//   interactionsTextConfig,
//   HIGH_INTERATION,
//   LOW_INTERACTION,
//   systems,
//   systemsTextConfig,
//   services,
//   servicesTextConfig,
//   INTENTION_DATAINDEX
// } from '../../../../configs/ConstConfig'
import { primaryColor } from 'themes/vars'

export const HIGH_INTERATION = "HighInteraction",
  LOW_INTERACTION = "LowInteraction";


export const interactionsTextConfig = {
  [HIGH_INTERATION]: "高交互",
  [LOW_INTERACTION]: "低交互"
}

export const interactions = Object.keys(interactionsTextConfig);

const gatewayReg = /^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-5][0-5])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/

const ipRangeReg = /^10\.|^192\.168\.|^172\.1[6-9]\.|^172\.2[0-9]\.|^172\.3[0-1]\./

import { ipReg } from 'utils/tools'
import { HOST_IP_DATA_INDEX } from 'modules/Manager_Mirror/ConstConfig';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
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

const Label = ({ keyName, className }) => <span className={className}>{honeypotTextConfig[keyName]}</span>

const shouldTrimDataIndexes = [HONEYPOT_NAME_DATAINDEX, HONEYPOT_IP_DATAINDEX, GATEWAY_DATAINDEX];

const defaultVmOptions = {
  [HIGH_DATA_INDEX]: {
    [SYSTEM_LIST_DATA_INDEX]: [],
    [SERVICE_LIST_DATA_INDEX]: {
      [WINDOW_SERVER_TYPE]: [],
      [LINUX_SERVER_TYPE]: []
    }
  },
  [LOW_DATA_INDEX]: {
    [SERVICE_LIST_DATA_INDEX]: []
  }
}

@(Form.create() as any)
class WrappedForm extends React.Component<any, any> {
  state = {
    [INTERCATION_DATAINDEX]: "HighInteraction",
    systemList: [],
    serviceList: []
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {

      if (err) {
        return
      }
      shouldTrimDataIndexes.forEach(i => values[i] = values[i].trim())

      // if (values[INTERCATION_DATAINDEX] === LOW_INTERACTION) {
      //   values[SYSTEM_DATAINDEX] = LOW_INTERACTION;
      // }
      // console.info(values)
      onSubmit && onSubmit(values)

    });
  }
  timer = {
    honeypotName: null,
    honeypotIp: null,
    gateway: null,
  }
  honeypotNameCheck = (rule, value, callback) => {
    clearTimeout(this.timer.honeypotName)
    value.trim().length === 0 && callback();
    this.timer.honeypotName = setTimeout(() => {
      this.props.validatorHandle({ type: "honeypotName", value: value.trim() }).then(({ payload, message }) => {

        payload !== 1 ? callback(message) : callback()
      })
    }, 500)
  }
  honeypotIpCheck = (rule, value, callback) => {
    clearTimeout(this.timer.honeypotIp);
    value.trim().length === 0 && callback();
    if (!ipReg.test(value.trim())) {
      callback("请输入正确的IP")
    }
    this.timer.honeypotIp = setTimeout(() => {
      this.props.validatorHandle({ type: "honeypotIp", value: value.trim() }).then(({ payload, message }) => {
        payload !== 1 ? callback(message) : callback()
      })
    }, 500)

  }
  gatewayCheck = (rule, value, callback) => {
    clearTimeout(this.timer.gateway)
    value.trim().length === 0 && callback();
    this.timer.gateway = setTimeout(() => {
      this.props.validatorHandle({ type: "gateway", value: value.trim() }).then(({ payload, message }) => {
        payload !== 1 ? callback(message) : callback()
      })
    }, 500)

  }
  componentDidMount() {
    this.setFormType(this.props)
  }
  componentWillReceiveProps(newProps) {
    this.setFormType(newProps)
  }
  setFormType = (props) => {
    const intercation = props.form.getFieldValue(INTERCATION_DATAINDEX)
    this.setState({
      [INTERCATION_DATAINDEX]: intercation
    })
  }
  interactionOnChange = e => {
    try {
      const targetInteraction = e.target.value
      const { vmOptions, form } = this.props
      const activeHostIp = form.getFieldValue(HOST_IP_DATAINDEX)
      this.props.form.resetFields([SERVICES_DATAINDEX, SYSTEM_DATAINDEX])

      this.props.form.setFieldsValue({ [SYSTEM_DATAINDEX]: Object.keys(vmOptions[activeHostIp][targetInteraction])[0] })
    } catch (e) {
      console.error(e)
    }
  }
  systemOnChange = () => {
    try {
      this.props.form.resetFields([SERVICES_DATAINDEX])
    } catch (e) {
      console.error(e)
    }
  }
  hostIpOnChange = (hostIp) => {
    try {
      const { vmOptions, form } = this.props
      let activeInteraction = form.getFieldValue(INTERCATION_DATAINDEX),
        activeSystem = (Object.keys(this.props.vmOptions[hostIp]) || {}).filter(k => k !== LOW_INTERACTION)[0]
      form.resetFields([SERVICES_DATAINDEX])
      form.resetFields(["adapter"])
      form.setFieldsValue({ [SYSTEM_DATAINDEX]: Object.keys(vmOptions[hostIp][activeInteraction])[0] })
      this.props.form.setFieldsValue({ [SERVICES_DATAINDEX]: [] })
    } catch (e) {
      console.error(e)
    }
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { isDark, loading, defaultValue = {} } = this.props
    const activeInteraction = this.state[INTERCATION_DATAINDEX]
    let { vmOptions } = this.props

    //hostIP
    const hostIPList = Object.keys(vmOptions)
    const defaultHostIP = get(hostIPList, ['0'], '')
    const activeHostIP = getFieldValue("hostIp") || defaultHostIP

    //system
    const systemList = Object.entries(get(vmOptions, [activeHostIP, activeInteraction], {}))
    const defaultSystem = get(systemList, ['0', '0'])
    const activeSystem = getFieldValue(SYSTEM_DATAINDEX) || defaultSystem

    //adapter
    const adapterList = Object.entries(get(vmOptions, [activeHostIP, 'adapter'], {}))
    const defaultAdapter = get(adapterList, ['0', '0'])
    const activeAdapter = getFieldValue(HOST_IP_DATAINDEX) || defaultAdapter

    //service
    const serviceList = Object.entries(get(systemList.find(([systemName, option]) => systemName === activeSystem), ['1', 'services'], {}))
    const defaultService = []
    const activeService = getFieldValue(SERVICES_DATAINDEX) || defaultService

    console.info(serviceList)
    const lblClasses = classnames({
      [styles["lbl-dark"]]: isDark
    })

    const commonProps = { ...formItemLayout, colon: false, hasFeedback: true, required: true }

    const radioClasses = classnames({
      [styles["radio"]]: true,
    })

    const checkboxClasses = classnames({
      [styles["check-box-dark"]]: isDark,
    })

    const sliderClasses = classnames({
      [styles["slider-dark"]]: isDark
    })

    return (
      <Form style={{ height: "100%", overflowY: "scroll", overflowX: "hidden" }}>
        <FormItem  {...commonProps}
          label={<Label className={lblClasses}
            keyName={HONEYPOT_NAME_DATAINDEX} />}>
          {
            getFieldDecorator(
              HONEYPOT_NAME_DATAINDEX,
              {
                initialValue: "",
                rules: [
                  {
                    required: true, message: '蜜罐名称不能为空',
                  },
                  {
                    validator: this.honeypotNameCheck
                  }
                ]
              }
            )
              (
              <Input disabled={loading} placeholder="例：win高交互蜜罐1" />
              )
          }
        </FormItem>
        <FormItem  {...commonProps}
          label={
            <span>
              主机管理IP - 设备ID
            </span>
          }>
          {
            getFieldDecorator(
              HOST_IP_DATAINDEX,
              {
                initialValue: defaultHostIP
              }
            )
              (
              <Select onChange={this.hostIpOnChange} disabled={loading}>
                {
                  hostIPList.map(i => <Option value={i} key={i}>
                    {i}
                  </Option>)
                }
              </Select>
              )
          }
          <span style={{ position: "absolute", marginLeft: "5px" }}>
            <Popover content={
              <div style={{ width: "400px", wordBreak: "break-all" }}>
                {activeAdapter}
              </div>
            }>
              <Icon type="eye" style={{ color: primaryColor }}></Icon>
            </Popover>
          </span>
        </FormItem>
        <FormItem  {...commonProps}
          label={
            <span>
              待监控 VLAN IP - 网卡
            </span>
          }>
          {
            getFieldDecorator(
              "adapter",
              {
                initialValue: defaultAdapter
              }
            )
              (
              <Select disabled={loading}>
                {
                  adapterList.map(([key, text]) =>
                    <Option value={key} key={key} >
                      {text}
                    </Option>
                  )
                }
              </Select>
              )
          }
        </FormItem>
        <FormItem  {...commonProps}
          label={<Label className={lblClasses}
            keyName={HONEYPOT_IP_DATAINDEX} />}>
          {
            getFieldDecorator(
              HONEYPOT_IP_DATAINDEX,
              {
                initialValue: "",
                rules: [
                  {
                    required: true, message: '蜜罐IP不能为空',
                  },
                  {
                    validator: this.honeypotIpCheck
                  }
                ]
              }
            )
              (
              <Input disabled={loading} />
              )
          }
        </FormItem>
        <FormItem  {...commonProps}
          label={<Label className={lblClasses}
            keyName={GATEWAY_DATAINDEX} />}>
          {
            getFieldDecorator(
              GATEWAY_DATAINDEX,
              {
                initialValue: defaultValue[GATEWAY_DATAINDEX] || "",
                rules: [
                  {
                    required: true, message: '蜜罐网关不能为空',
                  },
                  {
                    validator: this.gatewayCheck
                  }
                ]
              }
            )
              (
              <Input disabled={loading} />
              )
          }
        </FormItem>
        <FormItem  {...commonProps}
          hasFeedback={false}
          label={<Label className={lblClasses}
            keyName={INTERCATION_DATAINDEX} />}>
          {
            getFieldDecorator(
              INTERCATION_DATAINDEX,
              {
                initialValue: interactions[0]
              }
            )
              (
              <Radio.Group className={radioClasses} onChange={this.interactionOnChange} disabled={loading}>
                {
                  interactions.map(i => <Radio.Button value={i} key={i} disabled={loading}>
                    {interactionsTextConfig[i]}
                  </Radio.Button>)
                }
              </Radio.Group>
              )
          }
        </FormItem>
        <FormItem  {...commonProps}
          hasFeedback={false}
          label={activeInteraction === HIGH_INTERATION ? <Label className={lblClasses}
            keyName={SYSTEM_DATAINDEX} /> : <span className={lblClasses}>模拟设备类型</span>}>
          {
            getFieldDecorator(
              SYSTEM_DATAINDEX,
              {
                initialValue: defaultSystem
              }
            )
              (
              <Select onChange={this.systemOnChange} disabled={loading}>
                {
                  systemList.map(([key, value], index) => {
                    return <Select.Option value={key} key={`${index}-option`}>
                      {get(value, "title", "")}
                    </Select.Option>
                  })
                }
              </Select>
              )
          }
        </FormItem>
        <FormItem  {...commonProps}
          hasFeedback={false}
          label={<Label className={lblClasses}
            keyName={SERVICES_DATAINDEX} />}>
          {
            getFieldDecorator(
              SERVICES_DATAINDEX,
              {
                initialValue: [],
                rules: [
                  {
                    required: true, message: '服务支持不能为空',
                  }
                ]
              }
            )
              (
              <Checkbox.Group className={checkboxClasses} disabled={loading}>
                {
                  serviceList.map(([key, value], index) => {
                    return <Col key={`${index}-option`}>
                      <Checkbox value={key} >
                        {value}
                      </Checkbox>
                    </Col>
                  })
                }
              </Checkbox.Group>
              )
          }
        </FormItem>
        <FormItem {...formItemLayout}
          colon={false}
          hasFeedback={false}
          required={true}
          label={<Label className={lblClasses}
            keyName={RAM_DATAINDEX} />}>
          {getFieldDecorator(
            RAM_DATAINDEX,
            {
              initialValue: defaultValue[RAM_DATAINDEX] || 1
            }
          )(
            <Slider step={1}
              min={1}
              max={4}
              disabled={loading}
              className={sliderClasses}
              tipFormatter={value => `${value}GB`}
              marks={{ 1: '1GB', 2: '2GB', 3: '3GB', 4: '4GB' }} />
          )}
        </FormItem>
        <FormItem {...formItemLayout}
          colon={false}
          hasFeedback={false}
          required={true}
          label={<Label className={lblClasses}
            keyName={VCPUS_DATAINDEX} />}>
          {getFieldDecorator(
            VCPUS_DATAINDEX,
            {
              initialValue: defaultValue[VCPUS_DATAINDEX] || 1
            }
          )(
            <Slider step={1}
              min={1}
              max={4}
              disabled={loading}
              className={sliderClasses}
              marks={{ 1: '1', 2: '2', 3: '3', 4: '4' }} />
          )}
        </FormItem>
        {/* <Row style={{ marginBottom: "15px" }}>
          <Col span={10} push={6}>
            <Label className={lblClasses}
              keyName={AUTH_DATAINDEX} />
          </Col>
        </Row>
        <FormItem  {...commonProps}
          required={false}
          hasFeedback={false}
          label={<Label className={lblClasses}
            keyName={AUTH_USER_DATA_INDEX} />}>
          {
            getFieldDecorator(
              AUTH_USER_DATA_INDEX,
              {
                initialValue: ""
              }
            )
              (
              <Input disabled={loading} />
              )
          }
        </FormItem>
        <FormItem  {...commonProps}
          required={false}
          hasFeedback={false}
          label={<Label className={lblClasses}
            keyName={AUTH_PASSWORD_DATA_INDEX} />}>
          {
            getFieldDecorator(
              AUTH_PASSWORD_DATA_INDEX,
              {
                initialValue: ""
              }
            )
              (
              <Input disabled={loading} />
              )
          }
        </FormItem> */}
        <FormItem {...tailFormItemLayout}>
          <Button type="primary"
            loading={loading}
            icon="plus"
            onClick={this.handleSubmit}>创建</Button>
        </FormItem>
      </Form>
    );
  }
}

export default WrappedForm;
