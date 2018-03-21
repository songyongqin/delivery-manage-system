import React from 'react';
import styles from './styles.css'
import { Menu, Button, Breadcrumb, Tabs } from 'antd';
import { WithAnimateRender, WithBreadcrumb, WithContainerHeader } from '../../components/HOSComponents';
import { connect } from 'dva';
import OverallNetBasic from '../Analyse_Overall_NetBasic/Page';
import OverallLimitNetBasic from '../Analyse_Overall_LimitNetBasic/Page';
import OverallPcap from '../Analyse_Overall_PCAP/Page'
import OverallCapture from '../Analyse_Overall_Capture/Page'
import OverallSystem from '../Analyse_Overall_System/Page';
import OverallNet from '../Analyse_Overall_Net/Page';
import classnames from 'classnames';
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import {
  NAMESPACE,
  NODE,
  IDS,
  STAND_ALONE,
} from './ConstConfig'
import {
  IDS_STAND_ALONE
} from 'configs/ConstConfig'
import {
  NAMESPACE as OVERALL_NET_BASIC_NAMESPACE,
} from '../Analyse_Overall_NetBasic/ConstConfig'
import {
  NAMESPACE as OVERALL_NET_BASIC_LIMIT_NAMESPACE,
} from '../Analyse_Overall_LimitNetBasic/ConstConfig'
import {
  NAMESPACE as OVERALL_NET_NAMESPACE,
} from '../Analyse_Overall_Net/ConstConfig'
import {
  NAMESPACE as OVERALL_SYSTEM_NAMESPACE,
} from '../Analyse_Overall_System/ConstConfig'
import {
  NAMESPACE as OVERALL_CAPTURE_NAMESPACE,
} from '../Analyse_Overall_Capture/ConstConfig'
import {
  NAMESPACE as OVERALL_PCAP_NAMESPACE
} from '../Analyse_Overall_PCAP/ConstConfig'


import {
  initFilters as captureInitFilters
} from '../Analyse_Overall_Capture/Model.js'
import {
  initFilters as netInitFilters
} from '../Analyse_Overall_Net/Model.js'
import {
  initFilters as netBasicInitFilters
} from '../Analyse_Overall_NetBasic/Model'
import {
  initFilters as LimitNetBasicInitFilters
} from '../Analyse_Overall_LimitNetBasic/Model'
import {
  initFilters as pcapInitFilters
} from '../Analyse_Overall_PCAP/Model.js'
import {
  initFilters as systemInitFilters
} from '../Analyse_Overall_System/Model.js'

const initFiltersConfig = {
  [OVERALL_CAPTURE_NAMESPACE]: captureInitFilters,
  [OVERALL_NET_NAMESPACE]: netInitFilters,
  [OVERALL_NET_BASIC_NAMESPACE]: netBasicInitFilters,
  [OVERALL_NET_BASIC_LIMIT_NAMESPACE]: LimitNetBasicInitFilters,
  [OVERALL_PCAP_NAMESPACE]: pcapInitFilters,
  [OVERALL_SYSTEM_NAMESPACE]: systemInitFilters
}

function mapStateToProps(state) {
  const { commonLayout } = state.layout;
  return {
    isDark: commonLayout.darkTheme,
    [NAMESPACE]: state[NAMESPACE],
    [OVERALL_NET_BASIC_NAMESPACE]: state[OVERALL_NET_BASIC_NAMESPACE],
    [OVERALL_NET_BASIC_LIMIT_NAMESPACE]: state[OVERALL_NET_BASIC_LIMIT_NAMESPACE],
    [OVERALL_NET_NAMESPACE]: state[OVERALL_NET_NAMESPACE],
    [OVERALL_CAPTURE_NAMESPACE]: state[OVERALL_CAPTURE_NAMESPACE],
    [OVERALL_SYSTEM_NAMESPACE]: state[OVERALL_SYSTEM_NAMESPACE],
    [OVERALL_PCAP_NAMESPACE]: state[OVERALL_PCAP_NAMESPACE],
    timestampRange: state[NAMESPACE].timestampRange,
    lastTime: state[NAMESPACE].lastTime,
    panelLastTime: state[NAMESPACE].panelLastTime,
    productType: state.user.productType.type,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveActiveKey: payload => dispatch({
      type: `${OVERALL_NET_BASIC_LIMIT_NAMESPACE}/onQuery`,
      payload,
    }),
    setTimestampRange: payload => dispatch({
      type: `${NAMESPACE}/setTimestampRange`,
      payload,
    }),
    setPanelLastTime: payload => dispatch({
      type: `${NAMESPACE}/setPanelLastTime`,
      payload,
    })

  }
}


@connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))
@WithAnimateRender
@WithContainerHeader
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: OVERALL_NET_BASIC_NAMESPACE
    }
  }
  componentDidMount = () => {
    this.tabPanelFetchData(this.state.activeKey, [], new Date().getTime());
  }
  tabPanelFetchData = (activeKey, timestampRange, lastTime) => {
    const { panelLastTime } = this.props
    this.props.setTimestampRange({ timestampRange, lastTime })
    if (panelLastTime[activeKey] === lastTime) {
      return;
    }
    this.props.setPanelLastTime({
      [activeKey]: lastTime
    })
    this.props.dispatch({
      type: `${activeKey}/query`,
      payload: {
        // ...this.props[activeKey].queryFilters,
        // page: 1,
        // timestampRange,
        ...initFiltersConfig[activeKey],
        timestampRange
      }
    })
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
  onQuery = ({ timestampRange }) => {
    const lastTime = new Date().getTime()
    this.props.setTimestampRange({ timestampRange, lastTime })
    this.tabPanelFetchData(this.state.activeKey, timestampRange, lastTime)
  }
  tabOnChange = key => {
    this.setState({
      activeKey: key
    })
    this.props.saveActiveKey({ activeKey: key })
    this.tabPanelFetchData(key, this.props.timestampRange, this.props.lastTime)
  }
  getTabsContent = () => {
    const { lastTime, productType } = this.props;
    const tabClasses = classnames({
      [styles["page-dark"]]: this.props.isDark
    })

    const honeypotDataPanel = [
      // <Tabs.TabPane key={OVERALL_NET_NAMESPACE} tab="网络行为" style={{ minHeight: "400px" }}>
      //   <OverallNet lastTime={lastTime}></OverallNet>
      // </Tabs.TabPane>,
      <Tabs.TabPane key={OVERALL_SYSTEM_NAMESPACE} tab="系统行为" style={{ minHeight: "400px" }}>
        <OverallSystem lastTime={lastTime}></OverallSystem>
      </Tabs.TabPane>,
      <Tabs.TabPane key={OVERALL_CAPTURE_NAMESPACE} tab="捕获文件" style={{ minHeight: "400px" }}>
        <OverallCapture lastTime={lastTime}></OverallCapture>
      </Tabs.TabPane>,
      <Tabs.TabPane key={OVERALL_PCAP_NAMESPACE} tab="Pcap下载" style={{ minHeight: "400px" }}>
        <OverallPcap lastTime={lastTime}></OverallPcap>
      </Tabs.TabPane>
    ]

    return (
      <Tabs
        onChange={this.tabOnChange}
        key="tabs-content"
        className={tabClasses}
        activeKey={this.state.activeKey}>
        {/* {
          (productType === NODE || productType === STAND_ALONE)
            ?
            null
            : */}
        <Tabs.TabPane key={OVERALL_NET_BASIC_NAMESPACE} tab="网络基础数据" style={{ minHeight: "400px" }}>
          <OverallNetBasic lastTime={lastTime}></OverallNetBasic>
        </Tabs.TabPane>
        <Tabs.TabPane key={OVERALL_NET_BASIC_LIMIT_NAMESPACE} tab="异常可疑网络数据" style={{ minHeight: "400px" }}>
          <OverallLimitNetBasic lastTime={lastTime}></OverallLimitNetBasic>
        </Tabs.TabPane>

        {/* } */}
        {
          (productType === IDS || productType === IDS_STAND_ALONE)
            ?
            null
            :
            honeypotDataPanel
        }
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
