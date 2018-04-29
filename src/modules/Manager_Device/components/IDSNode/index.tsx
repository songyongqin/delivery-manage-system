import * as React from 'react'
import DeviceInfo from '../DeviceInfo'
import Card from 'domainComponents/Card'
import { MANAGER_DEVICE_IDS_NODE_NAMESPACE } from 'constants/model'

export default class Master extends React.Component<any, any>{

  render() {
    return (
      <Card title="流量监测设备" style={this.props.style}>
        <DeviceInfo
          {...this.props}
          overdueTipContent={{
            admin: "流量监测节点授权已过期或未授权，请使用管理员账号登录控制中心-设备管理页面执行授权操作",
            common: "流量监测节点授权已过期或未授权，请使用管理员账号登录控制中心-设备管理页面执行授权操作"
          }}
          overdueTipType={"warning"}
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