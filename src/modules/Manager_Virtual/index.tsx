import * as React from 'react'
import { MANAGER_VM_NAMESPACE, RECORD_OF_CREATE_VM_NAMESPACE } from 'constants/model'
import TableWithRemote from 'domainComponents/TableWithRemote'
import { If, Choose, When, } from 'components/ControlStatements'
import { getColumns } from './components/TableConfig'
import Card from 'domainComponents/Card'
import extraConnect from 'domainUtils/extraConnect'
import WithAnimateRender from 'components/WithAnimateRender'
import { Button, Dropdown, Menu, Modal, Icon, message as Message } from 'antd'
import Spin from 'domainComponents/Spin'
import CreateVM from './components/CreateVM'
import WithModal from 'components/WithModal'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithConfig from 'domainComponents/WithConfig'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig'
import path from 'constants/path'

const initialFilters = {
  page: 1,
  limit: 10
}

@WithConfig(path.layoutConfig.vm)
@WithCommonProps
@WithModal()
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
      fetchLoading: effectsLoading[`${MANAGER_VM_NAMESPACE}/fetch`],
      postVMLoading: effectsLoading[`${MANAGER_VM_NAMESPACE}/postVM`],
      record: state[RECORD_OF_CREATE_VM_NAMESPACE].recordOfCreateVM
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
      postVM: payload => dispatch({
        type: `${MANAGER_VM_NAMESPACE}/postVM`,
        payload
      }),
      updateLastReqTime: _ => dispatch({
        type: `${MANAGER_VM_NAMESPACE}/updateLastReqTime`
      }),
      monitorVMCreate: payload => dispatch({
        type: `${RECORD_OF_CREATE_VM_NAMESPACE}/monitorVMCreate`,
        payload
      }),
      changePanelVisible: payload => dispatch({
        type: `${RECORD_OF_CREATE_VM_NAMESPACE}/changePanelVisible`,
        payload
      }),
      fetchNodeIP: _ => dispatch({
        type: `${MANAGER_VM_NAMESPACE}/fetchNodeIP`,
      })
    }
  }
)
export default class VMManager extends React.PureComponent<any, any>{
  state = {
    activeItems: [],
    count: 1,
    activeFilter: null,
    initialFilters,
    filtersConfig: {
      hostIp: []
    }
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
    title: <div style={{ fontSize: "17px" }}>關閉蜜罐</div>,
    content: <div><span style={{ color: "red" }}>{info}</span> 關閉後，將無法再感知威脅信息</div>,
    onOk: _ => this.props.put({
      value: 0,
      ...payload
    })
      .then(this.props.updateLastReqTime)
  })

  reloadHandle = (payload, info) => Modal.confirm({
    title: <div style={{ fontSize: "17px" }}>還原蜜罐</div>,
    content: <div><span style={{ color: "red" }}>{info}</span> 還原初始鏡像後，將無法返回蜜罐當前狀態</div>,
    onOk: _ => this.props.put({
      value: -1,
      ...payload
    })
      .then(this.props.updateLastReqTime)
  })

  deleteHandle = (payload, info) => Modal.confirm({
    title: <div style={{ fontSize: "17px" }}>刪除蜜罐</div>,
    content: <div><span style={{ color: "red" }}>{info}</span> 刪除後，將無法再恢復</div>,
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

  onPost = payload => this.props.postVM(payload).then(honeypotId => {
    this.props.setModalVisible("create", false)
    this.props.monitorVMCreate({
      ...payload,
      honeypotId
    })
    this.props.changePanelVisible(true)
    Message.success('創建蜜罐操作成功，請耐心等待蜜罐創建成功')
  })

  saveActiveFilter = dataIndex => {
    this.setState({
      activeFilter: dataIndex
    })

  }
  componentDidMount() {
    this.props.fetchNodeIP().then(result => {
      this.setState({
        filtersConfig: {
          ...this.state.filtersConfig,
          hostIp: result
        }
      })
    })
  }
  render() {
    const { admin } = this.props
    const readonly = !admin
    const props = {
      key: `${this.props.lastReqTime}-vm-table`,
      loading: false,
      stopFetchOnFiltersChange: true,
      remoteNamespace: MANAGER_VM_NAMESPACE,
      initialFilters: this.state.initialFilters,
      getColumns: options => {
        return combineColumnsConfig(
          getColumns({
            ...options,
            handle: {
              logout: this.onLogoutClick,
              login: this.onLoginClick,
              delete: this.onDelClick,
              reload: this.onReloadClick
            },
            saveActiveFilter: this.saveActiveFilter,
            readonly,
            filtersConfig: this.state.filtersConfig
          }),
          this.props.config.columns
        )
      },
      onChange: filters => {
        this.setState({
          activeItems: [],
        })
      },
      tableOnChange: filters => {
        this.setState({
          initialFilters: {
            ...initialFilters,
            [this.state.activeFilter]: filters[this.state.activeFilter]
          }
        })
        this.props.updateLastReqTime()
      }
    }

    if (!readonly) {
      props["rowSelection"] = {
        onChange: (selectedRowKeys, selectedRows) => {
          this.setState({
            activeItems: selectedRows
          })
        }
      }
    }


    const menu = (
      <Menu
        onClick={({ key }) => {
          this.multipleHandle && this.multipleHandle(key)
        }}>
        <Menu.Item key="logout" >
          批量關機
        </Menu.Item>
        <Menu.Item key="delete">
          批量刪除蜜罐
        </Menu.Item>
        <Menu.Item key="reload">
          批量還原蜜罐鏡像
        </Menu.Item>
      </Menu>
    )

    return (
      this.props.animateRender([
        <Card title="虛擬蜜罐" key="vm">
          <Spin spinning={this.props.loading}>
            <div style={{ marginBottom: "10px" }}>
              <Button
                type="primary"
                icon="plus"
                disabled={this.props.loading || readonly}
                onClick={_ => this.props.setModalVisible("create", true)}>
                創建虛擬蜜罐
              </Button>
              <Dropdown.Button
                onClick={_ => this.multipleHandle("login")}
                style={{ marginLeft: "20px" }}
                disabled={this.state.activeItems.length === 0 || this.props.loading || readonly}
                overlay={menu}
                type="primary">
                批量開機
              </Dropdown.Button>
            </div>
            <Modal
              maskClosable={false}
              closable={!this.props.postVMLoading}
              onCancel={_ => this.props.setModalVisible("create", false)}
              destroyOnClose={true}
              width={640}
              footer={null}
              visible={this.props.modalVisible["create"]}
              title={<div><Icon type="plus"></Icon>&nbsp;創建虛擬蜜罐</div>}>
              <CreateVM onSubmit={this.onPost} loading={this.props.postVMLoading}></CreateVM>
            </Modal>
            <TableWithRemote
              {...props}>
            </TableWithRemote>
          </Spin>
        </Card>,
      ])
    )
  }
}