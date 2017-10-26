import React from 'react';
import styles from './styles.css'
import { Menu, Button, Breadcrumb, Tabs } from 'antd';
import { WithAnimateRender, WithBreadcrumb } from '../../components/HOSComponents';
import { connect } from 'dva';
import OverallNetBasic from '../Analyse_Overall_NetBasic/Page';
import classnames from 'classnames';

function mapStateToProps(state) {
  const { commonLayout } = state.layout;
  return {
    isDark: commonLayout.darkTheme
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

    const tabClasses = classnames({
      [styles["page-dark"]]: this.props.isDark
    })

    return (
      <Tabs key="tabs-content" className={tabClasses} style={{ marginTop: "15px" }}>
        <Tabs.TabPane key="net-basic" tab="网络基础数据">
          <OverallNetBasic></OverallNetBasic>
        </Tabs.TabPane>
        <Tabs.TabPane key="net" tab="网络行为">
        </Tabs.TabPane>
        <Tabs.TabPane key="system" tab="系统行为">

        </Tabs.TabPane>
        <Tabs.TabPane key="capture" tab="捕获文件">

        </Tabs.TabPane>
        <Tabs.TabPane key="pcap" tab="Pcap下载">

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
