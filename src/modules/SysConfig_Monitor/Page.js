import React from 'react';
import styles from './styles.css'
import { Menu, Button, Breadcrumb, Tabs } from 'antd';
import MonitorSettingForm from './components/MonitorSettingForm'
import Card from '../../domainComponents/Card'
import { connect } from 'dva';
import {
  NAMESPACE,
  MAIN_NAMESPACE,
  MODULE_MONITOR_DATA_INDEX
} from './ConstConfig.js'
import { WithAnimateRender, WithBreadcrumb } from '../../components/HOSComponents';
import MonitorControl from '../SysConfig_Monitor_Control/Page'
import MonitorIDS from '../SysConfig_Monitor_IDS/Page';
import MonitorNode from '../SysConfig_Monitor_Node/Page';
import classnames from 'classnames';
import { IDS, NODE, STAND_ALONE, DISTRIBUTION } from 'configs/ConstConfig'
function mapStateToProps(state) {
  const { commonLayout } = state.layout;
  return {
    isDark: commonLayout.darkTheme,
    productType: state.user.productType.type,
    productInfo: state.user.productType,
  }
}

@connect(mapStateToProps)
@WithBreadcrumb
@WithAnimateRender
class Page extends React.Component {
  constructor(props) {
    super(props);

  }
  getBreadcrumb = () => {
    return (
      <div key="bread-crumb" style={{ marginTop: "15px" }}>
        {this.props.getBreadcrumb(this.props.routes)}
      </div>
    )
  }
  getTabsContent = () => {

    const { productType } = this.props;

    const tabClasses = classnames({
      [styles["page-dark"]]: this.props.isDark
    })

    return (
      <Tabs key="content-tabs"
        className={tabClasses}
        style={{ marginTop: "15px" }}>
        {
          productType === DISTRIBUTION
          &&
          <Tabs.TabPane key="control" tab={productType === DISTRIBUTION ? "控制中心" : "单机版蜜罐设备"}>
            <MonitorControl />
          </Tabs.TabPane>
        }
        {
          (productType === NODE || productType === DISTRIBUTION)
          &&
          <Tabs.TabPane key="node" tab="蜜罐节点">
            <MonitorNode />
          </Tabs.TabPane>
        }
        {
          (productType === IDS || productType === DISTRIBUTION)
          &&
          <Tabs.TabPane key="ids" tab="流量监测系统">
            <MonitorIDS />
          </Tabs.TabPane>
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
