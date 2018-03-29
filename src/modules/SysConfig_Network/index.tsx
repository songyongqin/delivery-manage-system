import * as React from 'react'
import CloudDetection from './components/CloudDetection'
import SysLogServerConfig from './components/SysLogServerConfig'
import NetworkAuth from './components/NetworkAuth'
import WithAnimateRender from 'components/WithAnimateRender'

@WithAnimateRender
export default class SysConfigNetwork extends React.Component<any, any>{
  render() {
    return (
      <div>
        {
          this.props.animateRender([
            <SysLogServerConfig
              key="sys-log-server-config">
            </SysLogServerConfig>,
            <NetworkAuth
              key="network-auth">
            </NetworkAuth>,
            <CloudDetection
              key="cloud-detection">
            </CloudDetection>
          ])
        }
      </div>
    )
  }
}