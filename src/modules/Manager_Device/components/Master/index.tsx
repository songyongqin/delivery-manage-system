import * as React from 'react'
import DeviceInfo from '../DeviceInfo'
import Card from 'domainComponents/Card'
import { MANAGER_DEVICE_MASTER_NAMESPACE } from 'constants/model'

export default class Master extends React.Component<any, any>{

  render() {
    return (
      <Card title="控制中心" style={this.props.style}>
        <DeviceInfo
          {...this.props}
          overdueTipContent={{
            admin: "控制中心授权已过期或未授权，请执行授权操作",
            common: "控制中心授权已过期或未授权，请登录管理员账号执行授权操作"
          }}
          shouldHideCols={["connectStatus"]}
          remoteNamespace={MANAGER_DEVICE_MASTER_NAMESPACE}
          type="master"
          pagination={false}>
        </DeviceInfo>
      </Card>
    )
  }
}