import * as React from 'react'
import CloudDetection from './components/CloudDetection'
import SysLogServerConfig from './components/SysLogServerConfig'
import NetworkAuth from './components/NetworkAuth'
import DNS from './components/DNS'
import Network from './components/Network'
import MasterIPConfig from './components/MasterIPConfig'
import WithAnimateRender from 'components/WithAnimateRender'
import { If } from 'components/ControlStatements'
import { getAppConfig } from 'domain/app'
import { get } from 'utils'

@WithAnimateRender
export default class SysConfigNetwork extends React.Component<any, any>{
  render() {

    const networkConfig = get(getAppConfig(), ["networkConfig"], {})

    return (
      <div>
        {
          this.props.animateRender([
            <div key="dns">
              <If condition={networkConfig["dns"]}>
                <DNS key="dns"></DNS>
              </If>
            </div>,
            <div key="network">
              <If condition={networkConfig["network"]}>
                <Network key="network"></Network>
              </If>
            </div>,
            <div key="sys-log">
              <If condition={networkConfig["systemLog"]}>
                <SysLogServerConfig
                  key="sys-log-server-config">
                </SysLogServerConfig>
              </If>
            </div>,
            <div key="network-auth">
              <If condition={networkConfig["networkAuth"]}>
                <NetworkAuth
                  key="network-auth">
                </NetworkAuth>
              </If>
            </div>,
            <div key="master-ip-config">
              <If condition={networkConfig["masterIPConfig"]}>
                <MasterIPConfig key="master-ip-config">
                </MasterIPConfig>
              </If>
            </div>,
            <div key="cloud-detection">
              <If condition={networkConfig["cloudDetection"]}>
                <CloudDetection
                  key="cloud-detection">
                </CloudDetection>
              </If>
            </div>
          ])
        }
      </div>
    )
  }
}