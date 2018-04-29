import * as React from 'react'
import DeviceInfo from '../DeviceInfo'
import Card from 'domainComponents/Card'
import { MANAGER_DEVICE_HONEYPOT_STANDALONE_NAMESPACE } from 'constants/model'

export default class Master extends React.Component<any, any>{

  render() {
    return (
      <Card title="单机版蜜罐设备" style={this.props.style}>
        <DeviceInfo
          {...this.props}
          overdueTipContent={{
            admin: "蜜罐设备授权已过期或未授权，请执行授权操作",
            common: "蜜罐设备授权已过期或未授权，请登录管理员账号执行授权操作"
          }}
          shouldHideCols={["connectStatus"]}
          remoteNamespace={MANAGER_DEVICE_HONEYPOT_STANDALONE_NAMESPACE}
          type="honeypot"
          pagination={false}>
        </DeviceInfo>
      </Card>
    )
  }
}