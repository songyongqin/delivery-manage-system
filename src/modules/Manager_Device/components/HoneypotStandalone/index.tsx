import * as React from 'react'
import DeviceInfo from '../DeviceInfo'
import Card from 'domainComponents/Card'
import { MANAGER_DEVICE_HONEYPOT_STANDALONE_NAMESPACE } from 'constants/model'

export default class Master extends React.Component<any, any>{

  render() {
    return (
      <Card title="单机版蜜罐设备" style={this.props.style}>
        <DeviceInfo
          shouldHideCols={["connectStatus"]}
          remoteNamespace={MANAGER_DEVICE_HONEYPOT_STANDALONE_NAMESPACE}
          type="honeypot"
          pagination={false}>
        </DeviceInfo>
      </Card>
    )
  }
}