import * as React from 'react'
import DeviceInfo from '../DeviceInfo'
import Card from 'domainComponents/Card'
import { MANAGER_DEVICE_MASTER_NAMESPACE } from 'constants/model'

export default class Master extends React.Component<any, any>{

  render() {
    return (
      <Card title="控制中心" style={this.props.style}>
        <DeviceInfo
          remoteNamespace={MANAGER_DEVICE_MASTER_NAMESPACE}
          type="master"
          pagination={false}>
        </DeviceInfo>
      </Card>
    )
  }
}