import * as React from 'react'
import DeviceInfo from '../DeviceInfo'
import Card from 'domainComponents/Card'
import { MANAGER_DEVICE_IDS_NODE_NAMESPACE } from 'constants/model'

export default class Master extends React.Component<any, any>{

  render() {
    return (
      <Card title="流量监测设备" style={this.props.style}>
        <DeviceInfo
          remoteNamespace={MANAGER_DEVICE_IDS_NODE_NAMESPACE}
          multiple={false}
          readonly={true}
          masterIP={true}
          disk={false}
          pagination={false}>
        </DeviceInfo>
      </Card>
    )
  }
}