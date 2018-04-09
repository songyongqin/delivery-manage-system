import * as React from 'react'
import { MANAGER_VM_NAMESPACE } from 'constants/model'
import TableWithRemote from 'domainComponents/TableWithRemote'
import { If, Choose, When, } from 'components/ControlStatements'
import { getColumns } from './components/TableConfig'
import Card from 'domainComponents/Card'
import extraConnect from 'domainUtils/extraConnect'
import WithAnimateRender from 'components/WithAnimateRender'
import { Button, Dropdown, Menu, Modal } from 'antd'
import Spin from 'domainComponents/Spin'

@WithAnimateRender
@extraConnect(
  state => {
    const effectsLoading = state.loading.effects
    return {
      lastReqTime: state[MANAGER_VM_NAMESPACE].lastReqTime,
      loading: effectsLoading[`${MANAGER_VM_NAMESPACE}/fetch`] ||
        effectsLoading[`${MANAGER_VM_NAMESPACE}/putVM`] ||
        effectsLoading[`${MANAGER_VM_NAMESPACE}/postVM`] ||
        effectsLoading[`${MANAGER_VM_NAMESPACE}/deleteVM`],
      fetchLoading: effectsLoading[`${MANAGER_VM_NAMESPACE}/fetch`]

    }
  },
  dispatch => {
    return {
      dispatch,
      put: payload => dispatch({
        type: `${MANAGER_VM_NAMESPACE}/putVM`,
        payload
      }),
      delete: payload => dispatch({
        type: `${MANAGER_VM_NAMESPACE}/deleteVM`,
        payload
      }),
      post: payload => dispatch({
        type: `${MANAGER_VM_NAMESPACE}/postVM`,
        payload
      }),
      updateLastReqTime: _ => dispatch({
        type: `${MANAGER_VM_NAMESPACE}/updateLastReqTime`
      })
    }
  }
)
export default class VMManager extends React.Component<any, any>{
  state = {
    activeItems: []
  }

  onLoginClick = payload => this.loginHandle({ honeypotList: [payload["honeypotId"]] })

  onLogoutClick = payload => this.logoutHandle({ honeypotList: [payload["honeypotId"]] }, payload["honeypotName"])

  onReloadClick = payload => this.reloadHandle({ honeypotList: [payload["honeypotId"]] }, payload["honeypotName"])

  onDelClick = payload => this.deleteHandle({ honeypotId: [payload["honeypotId"]] }, payload["honeypotName"])

  loginHandle = payload => this.props.put({
    value: 1,
    ...payload
  })
    .then(this.props.updateLastReqTime)

  logoutHandle = (payload, info) => Modal.confirm({
    title: <div style={{ fontSize: "17px" }}>关闭蜜罐</div>,
    content: <div><span style={{ color: "red" }}>{info}</span> 关闭后，将无法再感知威胁信息</div>,
    onOk: _ => this.props.put({
      value: 0,
      ...payload
    })
      .then(this.props.updateLastReqTime)
  })

  reloadHandle = (payload, info) => Modal.confirm({
    title: <div style={{ fontSize: "17px" }}>还原蜜罐</div>,
    content: <div><span style={{ color: "red" }}>{info}</span> 还原初始镜像后，将无法返回蜜罐当前状态</div>,
    onOk: _ => this.props.put({
      value: -1,
      ...payload
    })
      .then(this.props.updateLastReqTime)
  })

  deleteHandle = (payload, info) => Modal.confirm({
    title: <div style={{ fontSize: "17px" }}>删除蜜罐</div>,
    content: <div><span style={{ color: "red" }}>{info}</span> 删除后，将无法再恢复</div>,
    onOk: _ => this.props.delete({
      ...payload
    })
      .then(this.props.updateLastReqTime)
  })

  multipleHandle = (key) => {
    const { activeItems } = this.state

    const info = activeItems.map(i => i["honeypotName"]).join(",")
    const honeypotList = activeItems.map(i => i["honeypotId"])

    if (key === "login") {
      return this.loginHandle({ honeypotList })
    }
    if (key === "logout") {
      return this.logoutHandle({ honeypotList }, info)
    }
    if (key === "reload") {
      return this.reloadHandle({ honeypotList }, info)
    }
    if (key === "delete") {
      return this.deleteHandle({ honeypotId: honeypotList }, info)
    }
  }

  render() {

    const props = {
      key: `${this.props.lastReqTime}-vm-table`,
      loading: false,
      remoteNamespace: MANAGER_VM_NAMESPACE,
      getColumns: options => {
        return getColumns({
          ...options,
          handle: {
            logout: this.onLogoutClick,
            login: this.onLoginClick,
            delete: this.onDelClick,
            reload: this.onReloadClick
          }
        })
      },
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.setState({
            activeItems: selectedRows
          })
        }
      },
      onChange: _ => {
        this.setState({
          activeItems: []
        })
      }
    }


    const menu = (
      <Menu onClick={({ key }) => {
        this.multipleHandle && this.multipleHandle(key)
      }}>
        <Menu.Item key="logout" >
          批量关机
        </Menu.Item>
        <Menu.Item key="delete">
          批量删除蜜罐
        </Menu.Item>
        <Menu.Item key="reload">
          批量还原蜜罐镜像
        </Menu.Item>
      </Menu>
    )

    return (
      this.props.animateRender([
        <Card title="虚拟蜜罐" key="vm">
          <Spin spinning={this.props.loading}>
            <div style={{ marginBottom: "10px" }}>
              <Button type="primary" icon="plus" disabled={this.props.loading}>创建虚拟蜜罐</Button>
              <Dropdown.Button
                onClick={_ => this.multipleHandle("login")}
                style={{ marginLeft: "20px" }}
                disabled={this.state.activeItems.length === 0 || this.props.loading}
                overlay={menu}
                type="primary">
                批量开机
              </Dropdown.Button>
            </div>
            <TableWithRemote
              {...props}>
            </TableWithRemote>
          </Spin>
        </Card>,
      ])
    )
  }
}