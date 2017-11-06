import React from 'react';
import styles from './styles.css'
import { Menu, Button, Breadcrumb, Tabs } from 'antd';
import { WithAnimateRender, WithBreadcrumb, WithContainerHeader } from '../../components/HOSComponents';
import { connect } from 'dva';
import OverallNetBasic from '../Analyse_Overall_NetBasic/Page';
import OverallPcap from '../Analyse_Overall_PCAP/Page'
import OverallCapture from '../Analyse_Overall_Capture/Page'
import OverallSystem from '../Analyse_Overall_System/Page';
import OverallNet from '../Analyse_Overall_Net/Page';
import classnames from 'classnames';
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import {
  NAMESPACE
} from './ConstConfig'
import {
  NAMESPACE as OVERALL_NET_BASIC_NAMESPACE,

} from '../Analyse_Overall_NetBasic/ConstConfig'
function mapStateToProps(state) {
  const { commonLayout } = state.layout;
  return {
    isDark: commonLayout.darkTheme,
    [NAMESPACE]: state[NAMESPACE],
    [OVERALL_NET_BASIC_NAMESPACE]: state[OVERALL_NET_BASIC_NAMESPACE]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTimestampRange: payload => dispatch({
      type: `${NAMESPACE}/setTimestampRange`,
      payload,
    }),

  }
}


@connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))
@WithAnimateRender
@WithContainerHeader
class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  query = {
    [OVERALL_NET_BASIC_NAMESPACE]: (payload = {}) => this.props.dispatch({
      type: `${OVERALL_NET_BASIC_NAMESPACE}/query`,
      payload: {
        ...this.props[OVERALL_NET_BASIC_NAMESPACE].queryFilters,
        ...payload,
      }
    })
  }
  getBreadcrumb = () => {
    const { routes } = this.props;
    const { queryFilters } = this.props[NAMESPACE];
    return (
      <div key="bread-crumb" style={{ marginTop: "15px" }}>
        {this.props.getContainerHeader({
          routes,
          queryFilters,
          onQuery: this.onQuery,
        })}
      </div>
    )
  }
  onQuery = payload => {
    this.props.setTimestampRange(...payload)
    this.query[OVERALL_NET_BASIC_NAMESPACE]({ ...payload, page: 1 });
  }
  getTabsContent = () => {

    const tabClasses = classnames({
      [styles["page-dark"]]: this.props.isDark
    })

    return (
      <Tabs
        key="tabs-content"
        className={tabClasses}
        defaultActiveKey={"net"}>
        <Tabs.TabPane key="net-basic" tab="网络基础数据">
          <OverallNetBasic></OverallNetBasic>
        </Tabs.TabPane>
        <Tabs.TabPane key="net" tab="网络行为">
          <OverallNet></OverallNet>
        </Tabs.TabPane>
        <Tabs.TabPane key="system" tab="系统行为">
          <OverallSystem></OverallSystem>
        </Tabs.TabPane>
        <Tabs.TabPane key="capture" tab="捕获文件">
          <OverallCapture></OverallCapture>
        </Tabs.TabPane>
        <Tabs.TabPane key="pcap" tab="Pcap下载">
          <OverallPcap></OverallPcap>
        </Tabs.TabPane>
      </Tabs>
    )
  }
  render = () => {




    return (
      this.props.animateRender([
        this.getBreadcrumb(),
        this.getTabsContent()
      ])
    )
  }
}

export default Page;
