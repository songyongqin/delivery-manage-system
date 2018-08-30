import * as React from 'react'
import Tabs from 'domainComponents/Tabs'
import Monitor from './components/Monitor'
import {
  SYS_CONFIG_MONITOR_HONEYPOT_NODE_NAMESPACE,
  SYS_CONFIG_MONITOR_IDS_NODE_NAMESPACE,
  SYS_CONFIG_MONITOR_MASTER_NAMESPACE
} from 'constants/model'
import { getCommonColumns, getNodeColumns } from './tableConfig'
import { getAppConfig } from 'domain/app'
import { get } from 'utils'
import { If } from 'components/ControlStatements'
import path from 'constants/path'
import WithConfig from 'domainComponents/WithConfig'
@WithConfig(path.layoutConfig.SysConfigMonitor)

export default class SysConfigMonitor extends React.Component<any, any>{
  constructor(props) {
    super(props)
  }
  render() {

    const monitorConfig = get(getAppConfig(), ["monitor"], {})

    return (
      <Tabs>
        {
          monitorConfig['master']
          &&
          <Tabs.TabPane tab="控制中心" key="master">
            <Monitor
              initialFilters={{ limit: 10, page: 1, type: "control" }}
              getColumns={getCommonColumns}
              remoteNamespace={SYS_CONFIG_MONITOR_MASTER_NAMESPACE}>
            </Monitor>
          </Tabs.TabPane>
        }
        {
          monitorConfig['honeypotStandalone']
          &&
          <Tabs.TabPane tab="单机版蜜罐设备" key="honeypot-standalone">
            <Monitor
              initialFilters={{ limit: 10, page: 1, type: "control" }}
              getColumns={getCommonColumns}
              remoteNamespace={SYS_CONFIG_MONITOR_MASTER_NAMESPACE}>
            </Monitor>
          </Tabs.TabPane>
        }
        {
          monitorConfig["honeypot"]
          &&
          <Tabs.TabPane tab="蜜罐节点" key="honeypot">
            <Monitor
              initialFilters={{ limit: 10, page: 1, type: "node" }}
              getColumns={getNodeColumns}
              remoteNamespace={SYS_CONFIG_MONITOR_HONEYPOT_NODE_NAMESPACE}>
            </Monitor>
          </Tabs.TabPane>
        }
        {
          monitorConfig["ids"]
          &&
          <Tabs.TabPane tab="流量监测系统" key="ids">
            <Monitor
              initialFilters={{ limit: 10, page: 1, type: "ids" }}
              getColumns={options => getNodeColumns({
                ...options,
                moduleMonitorTextConfig: this.props.config.columns
              })}
              remoteNamespace={SYS_CONFIG_MONITOR_IDS_NODE_NAMESPACE}>
            </Monitor>
          </Tabs.TabPane>
        }
      </Tabs>
    )
  }
}