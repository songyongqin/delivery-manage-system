import React from 'react';
import styles from './styles.css'
import { Menu, Button, Breadcrumb } from 'antd';
import MonitorSettingForm from './components/MonitorSettingForm'
import Card from '../../domainComponents/Card'
import { connect } from 'dva';
import {
  NAMESPACE,
  MAIN_NAMESPACE,
  MODULE_MONITOR_DATA_INDEX
} from './ConstConfig.js'
import { WithAnimateRender, WithContainerHeader } from '../../components/HOSComponents';
import MonitorControl from '../SysConfig_Monitor_Control/Page'
import MonitorIDS from '../SysConfig_Monitor_IDS/Page';

function mapStateToProps(state) {
  const { commonLayout } = state.layout;
  const effectLoading = state.loading.effects;
  return {
    commonLayout,
    moduleMonitorTextConfig: state[MAIN_NAMESPACE].queryResults[MODULE_MONITOR_DATA_INDEX]
  }
}

@connect(mapStateToProps)
@WithContainerHeader
@WithAnimateRender
class Page extends React.Component {
  constructor(props) {
    super(props);

  }

  render = () => {
    const { commonLayout, moduleMonitorTextConfig } = this.props;
    const isDark = commonLayout.darkTheme;
    return (
      this.props.animateRender([
        <div key="control">
          <MonitorControl />
        </div>,
        <div key="ids">
          <MonitorIDS />
        </div>
      ])
    )
  }
}

export default Page;
