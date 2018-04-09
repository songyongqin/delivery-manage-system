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
        effectsLoading[`${MANAGER_VM_NAMESPACE}/deleteVM`]
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
  onLogoutClick = payload => {
    console.info(payload)

  }
  onLoginClick = payload => this.loginHandle({ honeypotList: [payload["honeypotId"]] })
  onDelClick = payload => {
    console.info(payload)

  }
  onReloadClick = payload => {
    console.info(payload)
  }
  loginHandle = payload => this.props.put({
    value: 1,
    ...payload
  })
    .then(this.props.updateLastReqTime)

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
      }
    }


    const menu = (
      <Menu onClick={({ key }) => {
      }}>
        <Menu.Item key="poweroff" >
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