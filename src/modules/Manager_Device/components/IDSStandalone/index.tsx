import * as React from 'react'
import DeviceInfo from '../DeviceInfo'
import Card from 'domainComponents/Card'
import { MANAGER_DEVICE_IDS_STANDALONE_NAMESPACE } from 'constants/model'

export default class Master extends React.Component<any, any>{

  render() {
    return (
      <Card title="单机版流量监测设备" style={this.props.style}>
        <DeviceInfo
          shouldHideCols={["connectStatus"]}
          remoteNamespace={MANAGER_DEVICE_IDS_STANDALONE_NAMESPACE}
          type="ids"
          pagination={false}>
        </DeviceInfo>
      </Card>
    )
  }
}