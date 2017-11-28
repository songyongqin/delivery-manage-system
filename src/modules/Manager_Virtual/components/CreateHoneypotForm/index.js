/**
 * Created by jojo on 2017/9/8.
 */

import React from 'react';
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
  Radio
} from 'antd';

import styles from './styles.css';
import classnames from 'classnames';

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
} from '../../ConstConfig'

import {
  interactions,
  interactionsTextConfig,
  HIGH_INTERATION,
  LOW_INTERACTION,
  systems,
  systemsTextConfig,
  services,
  servicesTextConfig,
  INTENTION_DATAINDEX
} from '../../../../configs/ConstConfig'

const gatewayReg = /^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-5][0-5])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/

const ipRangeReg = /^10\.|^192\.168\.|^172\.1[6-9]\.|^172\.2[0-9]\.|^172\.3[0-1]\./

import { ipReg } from 'utils/tools'
import { HOST_IP_DATA_INDEX } from 'modules/Manager_Mirror/ConstConfig';

const FormItem = Form.Item;
const Option = Select.Option;

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

@Form.create()
class WrappedForm extends React.Component {
  state = {
    [INTERCATION_DATAINDEX]: null,
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

      if (values[INTERCATION_DATAINDEX] === LOW_INTERACTION) {
        values[SYSTEM_DATAINDEX] = LOW_INTERACTION;
      }

      onSubmit && onSubmit(values);

    });
  }
  timer = {}
  honeypotNameCheck = (rule, value, callback) => {
    clearTimeout(this.timer.honeypotName);
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
    clearTimeout(this.timer.gateway);
    value.trim().length === 0 && callback();
    this.timer.gateway = setTimeout(() => {
      this.props.validatorHandle({ type: "gateway", value: value.trim() }).then(({ payload, message }) => {
        payload !== 1 ? callback(message) : callback()
      })
    }, 500)

  }
  componentDidMount = () => {
    this.setFormType(this.props)
  }
  componentWillReceiveProps = (newProps) => {
    this.setFormType(newProps);
  }
  setFormType = (props) => {
    const intercation = props.form.getFieldValue(INTERCATION_DATAINDEX)
    this.setState({
      [INTERCATION_DATAINDEX]: intercation
    })
  }
  interactionOnChange = e => {
    this.props.form.resetFields([SERVICES_DATAINDEX])
  }
  systemOnChange = () => {
    this.props.form.resetFields([SERVICES_DATAINDEX])
  }
  hostIpOnChange = (hostIp) => {
    let activeSystem = (Object.keys(this.props.vmOptions[hostIp]) || {}).filter(k => k !== LOW_INTERACTION)[0]
    this.props.form.setFieldsValue({ [SYSTEM_DATAINDEX]: activeSystem })
    this.props.form.resetFields([SERVICES_DATAINDEX])
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { isDark, loading, defaultValue = {} } = this.props;
    const activeInteraction = this.state[INTERCATION_DATAINDEX];
    let { vmOptions } = this.props;
    const hostIpList = Object.keys(vmOptions)

    const defaultHostIp = hostIpList[0]

    const activeHostIp = getFieldValue(HOST_IP_DATAINDEX) || defaultHostIp;

    const systemList = Object.entries(vmOptions[activeHostIp] || {})
      .filter(([key, value]) => key !== LOW_INTERACTION)

    const defaultSystem = (systemList[0] || [])[0]

    const activeSystem = activeInteraction === LOW_INTERACTION
      ?
      LOW_INTERACTION
      :
      (getFieldValue(SYSTEM_DATAINDEX) || defaultSystem)

    const serviceList = Object.entries((((((vmOptions[activeHostIp] || {})[activeSystem]) || {})).services || {}) || {})

    const defaultService = []

    const activeService = getFieldValue(SERVICES_DATAINDEX) || defaultService


    // console.info(activeSystem, getFieldValue(SYSTEM_DATAINDEX), (vmOptions[activeHostIp] || {})[activeSystem])

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
      <Form style={{ height: "100%", overflowY: "scroll" }}>
        <FormItem  {...commonProps}
          label={<Label className={lblClasses}
            keyName={HONEYPOT_NAME_DATAINDEX} />}>
          {
            getFieldDecorator(
              HONEYPOT_NAME_DATAINDEX,
              {
                initialValue: defaultValue[HONEYPOT_NAME_DATAINDEX] || "",
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
          label={<Label className={lblClasses}
            keyName={HOST_IP_DATAINDEX} />}>
          {
            getFieldDecorator(
              HOST_IP_DATAINDEX,
              {
                initialValue: hostIpList[0]
              }
            )
              (
              <Select onChange={this.hostIpOnChange}>
                {
                  hostIpList.map(i => <Option value={i} key={i}>
                    {i}
                  </Option>)
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
                initialValue: defaultValue[HONEYPOT_IP_DATAINDEX] || "",
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
                initialValue: defaultValue[INTERCATION_DATAINDEX] || interactions[0]
              }
            )
              (
              <Radio.Group className={radioClasses} onChange={this.interactionOnChange}>
                {
                  interactions.map(i => <Radio.Button value={i} key={i}>
                    {interactionsTextConfig[i]}
                  </Radio.Button>)
                }
              </Radio.Group>
              )
          }
        </FormItem>
        {
          activeInteraction === HIGH_INTERATION
            ?
            <FormItem  {...commonProps}
              hasFeedback={false}
              label={<Label className={lblClasses}
                keyName={SYSTEM_DATAINDEX} />}>
              {
                getFieldDecorator(
                  SYSTEM_DATAINDEX,
                  {
                    initialValue: defaultSystem
                  }
                )
                  (
                  <Select onChange={this.systemOnChange}>
                    {
                      systemList.map(([key, value], index) => {
                        return <Select.Option value={key} key={`${index}-option`}>
                          {value.title}
                        </Select.Option>
                      })
                    }
                  </Select>
                  )
              }
            </FormItem>
            :
            null
        }
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
              <Checkbox.Group className={checkboxClasses}>
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
              className={sliderClasses}
              marks={{ 1: '1', 2: '2', 3: '3', 4: '4' }} />
            )}
        </FormItem>
        <Row style={{ marginBottom: "15px" }}>
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
        </FormItem>
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
