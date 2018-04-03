import * as React from 'react'
import DeviceInfo from '../DeviceInfo'
import Card from 'domainComponents/Card'
import { MANAGER_DEVICE_IDS_NAMESPACE } from 'constants/model'

export default class Master extends React.Component<any, any>{

  render() {
    return (
      <Card title="流量监测设备" style={this.props.style}>
        <DeviceInfo
          remoteNamespace={MANAGER_DEVICE_IDS_NAMESPACE}
          multiple={true}
          pagination={true}>
        </DeviceInfo>
      </Card>
    )
  }
}