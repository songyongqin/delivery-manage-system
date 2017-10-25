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

function mapStateToProps(state) {
  return {

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
  render = () => {
    return (
      this.props.animateRender([
        this.getBreadcrumb(),
        <div key="control" style={{ marginTop: "15px" }}>
          <MonitorControl />
        </div>,
        <div key="node" style={{ marginTop: "15px" }}>
          <MonitorNode />
        </div>,
        <div key="ids" style={{ marginTop: "15px" }}>
          <MonitorIDS />
        </div>,

      ])
    )
  }
}

export default Page;
