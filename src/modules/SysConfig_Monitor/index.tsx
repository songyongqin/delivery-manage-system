import * as React from 'react'
import Tabs from 'domainComponents/Tabs'
import Monitor from './components/Monitor'
import {
  SYS_CONFIG_MONITOR_HONEYPOT_NODE_NAMESPACE,
  SYS_CONFIG_MONITOR_IDS_NODE_NAMESPACE,
  SYS_CONFIG_MONITOR_MASTER_NAMESPACE
} from 'constants/model'
import { getCommonColumns, getNodeColumns } from './tableConfig'

export default class SysConfigMonitor extends React.Component<any, any>{
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Tabs>
        <Tabs.TabPane tab="控制中心" key="master">
          <Monitor
            initialFilters={{ limit: 10, page: 1, type: "control" }}
            getColumns={getCommonColumns}
            remoteNamespace={SYS_CONFIG_MONITOR_MASTER_NAMESPACE}>
          </Monitor>
        </Tabs.TabPane>
        <Tabs.TabPane tab="蜜罐节点" key="honeypot-node">
          <Monitor
            initialFilters={{ limit: 10, page: 1, type: "node" }}
            getColumns={getNodeColumns}
            remoteNamespace={SYS_CONFIG_MONITOR_HONEYPOT_NODE_NAMESPACE}>
          </Monitor>
        </Tabs.TabPane>
        <Tabs.TabPane tab="流量监测系统" key="ids-node">
          <Monitor
            initialFilters={{ limit: 10, page: 1, type: "ids" }}
            getColumns={getNodeColumns}
            remoteNamespace={SYS_CONFIG_MONITOR_IDS_NODE_NAMESPACE}>
          </Monitor>
        </Tabs.TabPane>
      </Tabs>
    )
  }
}