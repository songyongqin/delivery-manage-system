import React from 'react';
import {
  Menu,
  Button,
  Row,
  Col,
  Badge,
  message as Message,
} from 'antd';
import { WithAnimateRender, WithBreadcrumb } from '../../components/HOSComponents/index'
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import Card from '../../domainComponents/Card';
import {
  NAMESPACE,
  DNS_CONFIG_TITLE,
  DNS_NETWORK_TITLE,
  ADAPTER_LIST_DATAINDEX,
  ADAPTER_NAME_DATAINDEX,
  ADAPTER_STATUS_DATAINDEX,
  ADAPTER_MAC_DATAINDEX,
  adapterStatusTextConfig,
  STATUS_UN_CONNECT,
  STATUS_CONNECT,
  DNS_DATAINDEX
} from './ConstConfig'
import { connect } from 'dva';
import NetworkForm from './components/NetworkForm';
import DNSForm from './components/DNSForm';
import JoSpin from '../../components/JoSpin';
import classnames from 'classnames';

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
const AdapterContent = ({ data = [], titleStyle, isDark, loading, getAdapterPutHandle }) => (
  <Card title={DNS_NETWORK_TITLE}>
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
          defaultValue={i}
          onSubmit={getAdapterPutHandle(i[ADAPTER_MAC_DATAINDEX], i[ADAPTER_NAME_DATAINDEX])} />
      </div>
    ))}
  </Card>
)
/*********************************************************/
const mapStateToProps = state => ({
  [NAMESPACE]: state[NAMESPACE],
  putLoading: state.loading.effects[`${NAMESPACE}/put`],
  getLoading: state.loading.effects[`${NAMESPACE}/query`],
  commonLayout: state.layout.commonLayout
})
/*********************************************************/
const mapDispatchToProps = dispatch => ({
  get: () => dispatch({
    type: `${NAMESPACE}/query`
  }),
  put: payload => dispatch({
    type: `${NAMESPACE}/put`,
    payload,
  })
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
  getAdapterPutHandle = (mac, name) => payload => this.props.put({
    [ADAPTER]: {
      [ADAPTER_MAC_DATAINDEX]: mac,
      [ADAPTER_NAME_DATAINDEX]: name,
      ...(payload || {})
    }
  })
    .then(Message.success.call(null, "保存成功"))
    .then(this.props.get.call(this))
  /*********************************************************/
  getContentPanel = () => {
    const { queryResults } = this.props[NAMESPACE],
      { putLoading, getLoading, commonLayout } = this.props,
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
