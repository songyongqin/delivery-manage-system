import React from 'react';
import {
  Menu,
  Button,
  Row,
  Col,
  Badge,
  Icon,
  Tooltip,
  message as Message,
} from 'antd';
import { WithAnimateRender, WithBreadcrumb } from '../../components/HOSComponents/index'
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import Card from '../../domainComponents/Card';
import {
  NAMESPACE,
  SYS_LOG_CONFIG_NAMESPACE,
  DNS_CONFIG_TITLE,
  DNS_NETWORK_TITLE,
  ADAPTER_LIST_DATAINDEX,
  ADAPTER_NAME_DATAINDEX,
  ADAPTER_STATUS_DATAINDEX,
  ADAPTER_MAC_DATAINDEX,
  adapterStatusTextConfig,
  STATUS_UN_CONNECT,
  STATUS_CONNECT,
  DNS_DATAINDEX,
  SYS_LOG_NETWORK_TITLE,
  CONTROL_CONFIG_NAMESPACE,
  AUTH_NETWORK_802_NAMESPACE,
  ADAPTER_IP_DATAINDEX,
  ADAPTER_GW_DATAINDEX,
  ADAPTER_MAS_DATAINDEX,
  adapterTextConfig,
  VIRTUAL,
  VIRTUAL_DATA_INDEX
} from './ConstConfig'
import { IDS, DISTRIBUTION, NODE, STAND_ALONE } from 'configs/ConstConfig'
import { connect } from 'dva';
import NetworkForm from './components/NetworkForm';
import DNSForm from './components/DNSForm';
import SysLogServerConfigForm from './components/SysLogServerConfigForm'
import ControlConfigForm from './components/ControlConfigForm'
import JoSpin from '../../components/JoSpin'
import NetworkAuthForm from './components/NetworkAuthForm/'
import classnames from 'classnames';
import { ipReg, gatewayReg } from 'utils/tools'

/*********************************************************/
const DNSContent = ({ loading, defaultValue, onSubmit, isDark }) => (
  <Card title={DNS_CONFIG_TITLE} style={{ margin: "15px 0" }}>
    <DNSForm isDark={isDark}
      loading={loading}
      defaultValue={defaultValue}
      onSubmit={onSubmit} />
  </Card>
)
/*********************************************************/
export const rulesConfig = {
  [ADAPTER_IP_DATAINDEX]: [
    {
      required: true, message: "IP不能为空",
    },
    {
      pattern: ipReg,
      message: "请输入正确的IP"
    }
  ],
  [ADAPTER_MAS_DATAINDEX]: [
    {
      required: true, message: "子网掩码不能为空",
    },
    {
      pattern: ipReg,
      message: "请输入正确的子网掩码"
    }
  ],
  [ADAPTER_GW_DATAINDEX]: [
    {
      required: true, message: "网关不能为空",
    },
    {
      pattern: gatewayReg,
      message: "请输入正确的网关"
    }
  ]
}

const dataIndexes = [
  ADAPTER_IP_DATAINDEX,
  ADAPTER_MAS_DATAINDEX,
  ADAPTER_GW_DATAINDEX,
]

export const toFinalValue = (originValue) => {
  const prefix = originValue[ADAPTER_NAME_DATAINDEX]
  return Object.entries(originValue).reduce((target, [key, value]) => {
    target[`${prefix}/${key}`] = value
    return target
  }, {})
}

export const toOriginValue = (originValue, finalValue) => {
  const prefix = originValue[ADAPTER_NAME_DATAINDEX]
  return Object.entries(originValue).reduce((target, [key, value]) => {
    target[key] = finalValue[`${prefix}/${key}`]
    return target
  }, {})
}

const toOriginValueFnCreator = (originValue) => {
  return finalValue => toOriginValue(originValue, finalValue)
}

const toFinalRulesConfig = (originValue, rulesConfig) => {
  const prefix = originValue[ADAPTER_NAME_DATAINDEX]
  return Object.entries(originValue).reduce((target, [key, value]) => {
    target[`${prefix}/${key}`] = rulesConfig[key]
    return target
  }, {})
}

const toFinalTextConfig = (originValue, rulesConfig) => {
  const prefix = originValue[ADAPTER_NAME_DATAINDEX]
  return Object.entries(rulesConfig).reduce((target, [key, value]) => {
    target[`${prefix}/${key}`] = value
    return target
  }, {})
}

const toFinalDataIndexes = (originValue, dataIndexes) => {
  const prefix = originValue[ADAPTER_NAME_DATAINDEX]
  return dataIndexes.map(key => `${prefix}/${key}`)
}

const AdapterContent = ({ data = [], titleStyle, isDark, loading, getAdapterPutHandle }) => (
  <Card title={DNS_NETWORK_TITLE} style={{ marginBottom: "15px" }}>
    {data.map((i, index) => (
      <div key={`${index}-adapter`}
        style={{ marginBottom: "20px" }}>
        <h3 style={titleStyle}>
          {i[ADAPTER_STATUS_DATAINDEX] === STATUS_CONNECT
            ?
            <Badge status="success" />
            :
            <Badge status="error" />}
          {i[ADAPTER_NAME_DATAINDEX]}
          {"("}
          {adapterStatusTextConfig[i[ADAPTER_STATUS_DATAINDEX]]}
          {")"}
        </h3>
        <NetworkForm isDark={isDark}
          loading={loading}
          disabled={i[VIRTUAL_DATA_INDEX] === VIRTUAL}
          rulesConfig={toFinalRulesConfig(i, rulesConfig)}
          dataIndexes={toFinalDataIndexes(i, dataIndexes)}
          labelTextConfig={toFinalTextConfig(i, adapterTextConfig)}
          defaultValue={toFinalValue(i)}
          onSubmit={getAdapterPutHandle(i[ADAPTER_MAC_DATAINDEX], i[ADAPTER_NAME_DATAINDEX], toOriginValueFnCreator(i))} />
      </div>
    ))}
  </Card>
)
/*********************************************************/
const SysLogServerContent = ({ data = {}, isDark, loading, onSubmit }) => {
  return <Card title={SYS_LOG_NETWORK_TITLE} style={{ marginBottom: "15px" }}>
    <JoSpin spinning={loading}>
      <SysLogServerConfigForm
        loading={loading}
        defaultValue={data}
        onSubmit={onSubmit}
        isDark={isDark}>
      </SysLogServerConfigForm>
    </JoSpin>
  </Card>
}

/*********************************************************/
const ControlCenterConfigContent = ({ data = {}, isDark, loading, onSubmit }) => {
  return <Card title={"控制中心IP配置"} style={{ marginBottom: "15px" }}>
    <JoSpin spinning={loading}>
      <ControlConfigForm
        loading={loading}
        defaultValue={data}
        onSubmit={onSubmit}
        isDark={isDark}>
      </ControlConfigForm>
    </JoSpin>
  </Card>
}
/*********************************************************/
const NetworkAuthContent = ({ data = {}, isDark, loading, onSubmit }) => {
  return <Card title={
    <p>
      802.1x认证配置
      &nbsp;
      <Tooltip title="此配置适用于需要进行802.1x协议端口上网认证的网络环境，需输入认证的账号名和密码">
        <a style={{ color: "#108ee9" }}>
          <Icon type="question-circle-o" />
        </a>
      </Tooltip>
    </p>
  } style={{ marginBottom: "15px" }}>
    <JoSpin spinning={loading}>
      <NetworkAuthForm
        loading={loading}
        defaultValue={data}
        onSubmit={onSubmit}
        isDark={isDark}>
      </NetworkAuthForm>
    </JoSpin>
  </Card>
}

/*********************************************************/
const mapStateToProps = state => ({
  [NAMESPACE]: state[NAMESPACE],
  sysLogConfig: state[SYS_LOG_CONFIG_NAMESPACE].queryResults,
  putLoading: state.loading.effects[`${NAMESPACE}/put`],
  getLoading: state.loading.effects[`${NAMESPACE}/query`],
  sysConfigLoading: state.loading.effects[`${SYS_LOG_CONFIG_NAMESPACE}/query`] ||
    state.loading.effects[`${SYS_LOG_CONFIG_NAMESPACE}/put`],
  commonLayout: state.layout.commonLayout,
  productType: state.user.productType.type,
  productInfo: state.user.productType,
  authNetworkConfig: state[AUTH_NETWORK_802_NAMESPACE].queryResults,
  controlConfig: state[CONTROL_CONFIG_NAMESPACE].queryResults,
  controlConfigLoading: state.loading.effects[`${CONTROL_CONFIG_NAMESPACE}/query`] ||
    state.loading.effects[`${CONTROL_CONFIG_NAMESPACE}/put`],
  authNetworkLoading: state.loading.effects[`${AUTH_NETWORK_802_NAMESPACE}/query`] ||
    state.loading.effects[`${AUTH_NETWORK_802_NAMESPACE}/put`]
})
/*********************************************************/
const mapDispatchToProps = dispatch => ({
  get: () => dispatch({
    type: `${NAMESPACE}/query`
  }),
  put: payload => dispatch({
    type: `${NAMESPACE}/put`,
    payload,
  }),
  getSysLogConfig: payload => dispatch({
    type: `${SYS_LOG_CONFIG_NAMESPACE}/query`,
  }),
  putSysLogConfig: payload => dispatch({
    type: `${SYS_LOG_CONFIG_NAMESPACE}/put`,
    payload,
  }),
  getControlConfig: payload => dispatch({
    type: `${CONTROL_CONFIG_NAMESPACE}/query`,
  }),
  putControlConfig: payload => dispatch({
    type: `${CONTROL_CONFIG_NAMESPACE}/put`,
    payload,
  }),
  getAuthNetworkConfig: payload => dispatch({
    type: `${AUTH_NETWORK_802_NAMESPACE}/query`,
  }),
  putAuthNetworkConfig: payload => dispatch({
    type: `${AUTH_NETWORK_802_NAMESPACE}/put`,
    payload,
  }),
})
/*********************************************************/
const ADAPTER = "adapter";
/*********************************************************/
@connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))
@WithBreadcrumb
@WithAnimateRender
class Page extends React.Component {
  /*********************************************************/
  constructor(props) {
    super(props);
  }
  /*********************************************************/
  componentDidMount = () => {
    this.props.get();
    this.props.getSysLogConfig()
    this.props.getAuthNetworkConfig()
    if (this.props.productType === IDS || this.props.productType === NODE) {
      this.props.getControlConfig()
    }
  }
  /*********************************************************/
  getBreadcrumb = () => {
    return <div key="breadcrumb-panel" style={{ margin: "15px 0" }}>
      {this.props.getBreadcrumb(this.props.routes)}
    </div>
  }
  /*********************************************************/
  dnsPutHandle = payload => this.props.put({
    [DNS_DATAINDEX]: payload
  })
    .then(Message.success.call(null, "保存成功"))
    .then(this.props.get.call(this))
  /*********************************************************/
  getAdapterPutHandle = (mac, name, toOriginValue) => payload => this.props.put({
    [ADAPTER]: {
      ...(toOriginValue(payload) || {}),
      [ADAPTER_MAC_DATAINDEX]: mac,
      [ADAPTER_NAME_DATAINDEX]: name,
    }
  })
    .then(Message.success.call(null, "保存成功", 3))
    .then(this.props.get.call(this))
  /*********************************************************/
  putSysLogConfig = payload => this.props.putSysLogConfig(payload)
    .then(result => Message.success("保存成功", 3))
  /*********************************************************/
  putControlConfig = payload => this.props.putControlConfig(payload)
    .then(result => Message.success("保存成功", 3))
  /*********************************************************/
  putAuthNetworkConfig = payload => this.props.putAuthNetworkConfig(payload)

  getContentPanel = () => {
    const { queryResults } = this.props[NAMESPACE],
      { putLoading, getLoading, commonLayout, sysConfigLoading, sysLogConfig, controlConfigLoading, controlConfig } = this.props,
      isDark = commonLayout.darkTheme;

    let titleStyle = { fontSize: "16px", marginBottom: "10px" };
    titleStyle = isDark ? { ...titleStyle, color: "white" } : titleStyle;

    return (
      <div key="content-panel" style={{ paddingBottom: "150px" }}>
        <JoSpin spinning={putLoading || getLoading}>
          <DNSContent loading={putLoading}
            isDark={isDark}
            onSubmit={this.dnsPutHandle}
            defaultValue={{ [DNS_DATAINDEX]: queryResults[DNS_DATAINDEX] }} />
          <AdapterContent data={queryResults[ADAPTER_LIST_DATAINDEX]}
            isDark={isDark}
            loading={putLoading}
            titleStyle={titleStyle}
            getAdapterPutHandle={this.getAdapterPutHandle} />
          <SysLogServerContent
            onSubmit={this.putSysLogConfig}
            loading={sysConfigLoading}
            data={sysLogConfig}
            isDark={isDark}>
          </SysLogServerContent>
          {
            (this.props.productType === IDS || this.props.productType === NODE)
            &&
            <ControlCenterConfigContent
              loading={controlConfigLoading}
              data={controlConfig}
              onSubmit={this.putControlConfig}
              isDark={isDark}>
            </ControlCenterConfigContent>
          }
          <NetworkAuthContent
            isDark={isDark}
            loading={this.props.authNetworkLoading}
            data={this.props.authNetworkConfig}
            onSubmit={this.putAuthNetworkConfig}>
          </NetworkAuthContent>
        </JoSpin>
      </div>
    )
  }
  render = () => {


    return (
      <div >
        {
          this.props.animateRender([
            this.getBreadcrumb(),
            this.getContentPanel()
          ])
        }
      </div>
    )
  }
}




export default Page;
