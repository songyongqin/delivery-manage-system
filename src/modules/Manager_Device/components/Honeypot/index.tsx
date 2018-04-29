import * as React from 'react'
import DeviceInfo from '../DeviceInfo'
import Card from 'domainComponents/Card'
import { MANAGER_DEVICE_HONEYPOT_NAMESPACE } from 'constants/model'

export default class Master extends React.Component<any, any>{

  render() {
    return (
      <Card title="蜜罐节点设备" style={this.props.style}>
        <DeviceInfo
          {...this.props}
          remoteNamespace={MANAGER_DEVICE_HONEYPOT_NAMESPACE}
          multiple={true}
          type="honeypot"
          pagination={true}>
        </DeviceInfo>
      </Card>
    )
  }
}