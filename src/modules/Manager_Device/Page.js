import React from 'react'
import { WithBreadcrumb, WithAnimateRender } from '../../components/HOSComponents/index'
import DeviceControl from '../Manager_Device_Control/Page'
import DeviceNode from '../Manager_Device_Node/Page'
import DeviceNodeIDS from '../Manager_Device_Node_IDS/Page'

import { NAMESPACE as MANAGER_DEVICE_NAMESPACE } from '../Manager_Device_Control/ConstConfig'
import { NAMESPACE as MANAGER_DEVICE_DISK_NAMESPACE } from '../Manager_Device_Control_Disk/ConstConfig'
import { NAMESPACE as MANAGER_DEVICE_NODE_DISK_NAMESPACE } from '../Manager_Device_Node_Disk/ConstConfig'
import { NAMESPACE as MANAGER_DEVICE_NODE_NAMESPACE } from '../Manager_Device_Node/ConstConfig'
import { NAMESPACE as MANAGER_DEVICE_NODE_IDS_NAMESPACE } from '../Manager_Device_Node_IDS/ConstConfig'
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import { NAMESPACE as DEVICE_NAMESPACE } from '../Manager_Device/ConstConfig'
import { connect } from 'dva'
import {
  STAND_ALONE,
  IDS,
  NODE,
  IDS_STAND_ALONE,
  OVER_DUE_NAMESPACE,
  DISTRIBUTION,
  ADMIN_ROLE,
  COMMON_USER_ROLE
} from 'configs/ConstConfig'
import { Modal } from 'antd'
import { getTemp } from 'utils/tools'


const mapStateToProps = state => {
  return {
    productType: state.user.productType.type,
    isAdmin: state.user.userData.isAdmin,
    overdueTipVisible: state[DEVICE_NAMESPACE].overdueTipVisible
  }
}

const mapDispatchToProps = dispatch => ({
  changeOverdueTipVisible: payload => dispatch({
    type: `${DEVICE_NAMESPACE}/changeOverdueTipVisible`,
    payload
  })
})

const overdueTextConfig = {
  [DISTRIBUTION]: {
    [ADMIN_ROLE]: "控制中心授权已过期或未授权，请执行授权操作",
    [COMMON_USER_ROLE]: "控制中心授权已过期或未授权，请登录管理员账号执行授权操作"
  },
  [STAND_ALONE]: {
    [ADMIN_ROLE]: "蜜罐设备授权已过期或未授权，请执行授权操作",
    [COMMON_USER_ROLE]: "蜜罐设备授权已过期或未授权，请登录管理员账号执行授权操作"
  },
  [IDS_STAND_ALONE]: {
    [ADMIN_ROLE]: "设备授权已过期或未授权，请执行授权操作",
    [COMMON_USER_ROLE]: "设备授权已过期或未授权，请执行授权操作"
  },
  [NODE]: {
    [ADMIN_ROLE]: "蜜罐节点授权已过期或未授权，请使用管理员账号登录控制中心-设备管理页面执行授权操作",
    [COMMON_USER_ROLE]: "蜜罐节点授权已过期或未授权，请使用管理员账号登录控制中心-设备管理页面执行授权操作"
  },
  [IDS]: {
    [ADMIN_ROLE]: "流量监测节点授权已过期或未授权，请使用管理员账号登录控制中心-设备管理页面执行授权操作",
    [COMMON_USER_ROLE]: "流量监测节点授权已过期或未授权，请使用管理员账号登录控制中心-设备管理页面执行授权操作"
  }

}

let overdueTipModalRef = null

@connect(mapStateToProps, mapDispatchToProps)
@WithAnimateRender
@WithBreadcrumb
class Page extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLicence: false,
    }

  }
  hideLicence = () => {
    this.setState({
      showLicence: false
    })
  }
  getBreadcrumb = () => {
    return (
      <div key="bread-crumb" style={{ marginTop: "15px" }}>
        {this.props.getBreadcrumb(this.props.routes)}
      </div>
    )
  }
  getContent = () => {
    const { productType } = this.props
    if (productType === NODE || productType === STAND_ALONE) {
      return <div key="content" >
        {
          this.props.animateRender([
            this.getNodeHoneypotPanel(),
          ])
        }
      </div>
    }

    if (productType === IDS || productType === IDS_STAND_ALONE) {
      return (
        <div key="content" >
          {
            this.props.animateRender([
              this.getNodeIDSPanel()
            ])
          }
        </div>
      )
    }

    return (

      <div key="content" >
        {
          this.props.animateRender([
            this.getControlPanel(),
            this.getNodeHoneypotPanel(),
            this.getNodeIDSPanel()
          ])
        }
      </div>
    )
  }
  getControlPanel = () => {

    return (
      <div key="control-panel" style={{ marginTop: "15px" }}>
        <DeviceControl showLicence={this.state.showLicence} hideLicence={this.hideLicence}></DeviceControl>
      </div>
    )
  }

  getNodeHoneypotPanel = () => {
    return (
      <div key="node-panel-honeypot" style={{ marginTop: "15px" }}>
        <DeviceNode showLicence={this.state.showLicence} hideLicence={this.hideLicence}></DeviceNode>
      </div>
    )
  }
  getNodeIDSPanel = () => {

    return (
      <div key="node-panel-ids" style={{ marginTop: "15px" }}>
        <DeviceNodeIDS showLicence={this.state.showLicence} hideLicence={this.hideLicence}></DeviceNodeIDS>
      </div>
    )
  }
  componentDidMount = () => {
    this.showOverdueTipModal()
  }
  componentWillReceiveProps = newProps => {
    if (newProps.overdueTipVisible) {
      this.showOverdueTipModal()
    }

  }
  showOverdueTipModal = () => {
    const { productType, isAdmin, overdueTipVisible } = this.props

    if ((window.sessionStorage.getItem(OVER_DUE_NAMESPACE) || overdueTipVisible) && !overdueTipModalRef) {

      let modalType = isAdmin ? "confirm" : "warning"

      modalType = (productType === IDS || productType === NODE) ? "warning" : modalType

      overdueTipModalRef = Modal[modalType]({
        title: "授权已失效",
        content: overdueTextConfig[productType][isAdmin ? ADMIN_ROLE : COMMON_USER_ROLE],
        okText: modalType === "confirm" ? "执行授权操作" : "确定",
        cancelText: "取消",
        onOk: () => {
          this.setState({
            showLicence: (productType === DISTRIBUTION || productType === STAND_ALONE || productType === IDS_STAND_ALONE) && isAdmin
          })

          this.props.changeOverdueTipVisible(false)
          overdueTipModalRef = null
        },
        onCancel: () => {
          overdueTipModalRef = null
        }
      })
    }
  }
  render = () => {

    return (
      <div>
        {
          this.props.animateRender(
            [
              this.getBreadcrumb(),
              this.getContent(),
            ]
          )
        }
      </div>
    )
  }
}

export default Page;

