import * as React from 'react'
import extraConnect from 'domainUtils/extraConnect'
import { getColumns } from '../../tableConfig'
import TableWithRemote from 'domainComponents/TableWithRemote'
const styles = require('./styles.less')
import DiskClear from './DiskClear'
import { Modal, Icon, Menu, Dropdown } from 'antd'
import WithModal from 'components/WithModal'
import Licence from './Licence'
import Update from './Update'
import Clean from './Clean'
import MasterIP from './MasterIP'
import Spin from 'domainComponents/Spin'
import { If, When, Choose, Otherwise } from 'components/ControlStatements'

interface Props {
  readonly?: boolean,
  multiple?: boolean,
  remoteNamespace: string,
  getColumns: any
}

const mapStateToProps = state => {
  return {
    effectsLoading: state.loading.effects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

@WithModal()
@extraConnect(mapStateToProps, mapDispatchToProps)
export default class DeviceInfo extends React.Component<any, any>{
  static defaultProps = {
    readonly: false,
    multiple: false,
    disk: true,
    masterIP: false,
    shouldHideCols: []
  }
  state = {
    activeItems: [],
    lastReqTime: 0,
    lastVisibleChange: 0,
    modalReload: {
      licence: false,
      update: false
    },
    refreshDataOnClose: false
  }
  onChange = _ => {
    this.setState({
      activeItems: []
    })
  }
  onLicenceClick = activeItems => {
    this.setState({
      activeItems
    })
    this.props.switchModal("licence")
  }
  onUpdateClick = activeItems => {
    this.setState({
      activeItems
    })
    this.props.switchModal("update")
  }
  onCleanClick = activeItems => {
    this.setState({
      activeItems
    })
    this.props.switchModal("clean")
  }
  onLicenceSubmit = payload => {
    return this.props.dispatch({
      type: `${this.props.remoteNamespace}/postLicence`,
      payload
    })
      .then(res => {
        this.setModalReloadByKey("licence", res)
        return res
      })
  }
  setModalReloadByKey = (key, res) => {
    try {
      if (res.some(i => i["status"] === 1)) {
        this.setState({
          modalReload: {
            ...this.state.modalReload,
            [key]: true,
          }
        })
      }
    } catch (e) {
      console.error(e)
    }
  }
  getClosableValueByKey = (key) => {
    const { modalReload } = this.state
    const { effectsLoading, remoteNamespace } = this.props
    if (modalReload[key]) {
      return false
    }
    if (key === "licence") {
      return !effectsLoading[`${remoteNamespace}/postLicence`]
    }
    return true
  }
  /*通过本地文件的方式获取可更新的信息*/
  fetchUpdateInfoByLocal = payload => {
    return this.props.dispatch({
      type: `${this.props.remoteNamespace}/fetchVersionInfoByLocal`,
      payload
    })
  }
  /*通过远程服务器的方式获取可更新的信息*/
  fetchUpdateInfoByRemote = payload => {
    return this.props.dispatch({
      type: `${this.props.remoteNamespace}/fetchVersionInfoByRemote`,
      payload
    })
  }
  /*通过本地文件的方式更新*/
  updateByRemote = payload => this.props.dispatch({
    type: `${this.props.remoteNamespace}/updateByRemote`,
    payload
  })
    .then(res => {
      this.setModalReloadByKey("update", res)
      return res
    })
  /*通过远程服务器的方式更新*/
  updateByLocal = payload => this.props.dispatch({
    type: `${this.props.remoteNamespace}/updateByLocal`,
    payload
  })
    .then(res => {
      this.setModalReloadByKey("update", res)
      return res
    })


  postClean = payload => this.props.dispatch({
    type: `${this.props.remoteNamespace}/postDisk`,
    payload
  })
    .then(res => {
      this.setState({
        refreshDataOnClose: true
      })
      return res
    })

  getLoadingStatusByKey = key => {
    const { effectsLoading, remoteNamespace } = this.props
    if (key === "licence") {
      return effectsLoading[`${remoteNamespace}/postLicence`]
    }
    if (key === "update") {
      return effectsLoading[`${remoteNamespace}/fetchVersionInfoByLocal`] ||
        effectsLoading[`${remoteNamespace}/fetchVersionInfoByRemote`] ||
        effectsLoading[`${remoteNamespace}/updateByRemote`] ||
        effectsLoading[`${remoteNamespace}/updateByLocal`]
    }
    if (key === "clean") {
      return effectsLoading[`${remoteNamespace}/postDisk`]
    }
  }

  createOnCancelHandleByKey = key => {
    return _ => {
      this.props.setModalVisible(key, false)

      if (this.state.refreshDataOnClose) {
        this.setState({
          lastReqTime: new Date().getTime(),
          refreshDataOnClose: false
        })
      }

      setTimeout(() => {
        this.setState({
          lastVisibleChange: new Date().getTime()
        })
      }, 100)
    }
  }
  render() {
    const { pagination, remoteNamespace, multiple, modalVisible, switchModal, disk, effectsLoading, masterIP, readonly, shouldHideCols } = this.props
    const { modalReload, lastReqTime } = this.state

    let props: any = {
      key: `${lastReqTime}-table`,
      pagination,
      remoteNamespace,
      getColumns: (options) => {
        return getColumns({
          ...options,
          handle: {
            licence: this.onLicenceClick,
            update: this.onUpdateClick,
            clean: this.onCleanClick
          },
          readonly,
          shouldHideCols: shouldHideCols
        })
      },
      onChange: this.onChange
    }

    if (multiple) {
      props["rowSelection"] = {
        onChange: (selectedRowKeys, selectedRows) => {
          this.setState({
            activeItems: selectedRows
          })
        }
      }
    }

    return (
      <div className={styles["device-info-wrapper"]}>
        <div style={{ marginBottom: "10px", overflow: "hidden" }}>
          <If condition={masterIP}>
            <div style={{ float: "left", marginRight: "15px" }}>
              <MasterIP remoteNamespace={remoteNamespace}></MasterIP>
            </div>
          </If>

          <If condition={disk}>
            <div style={{ float: "left", marginRight: "15px" }}>
              <DiskClear
                remoteNamespace={remoteNamespace}>
              </DiskClear>
            </div>
          </If>

          <If condition={multiple}>
            <div style={{ float: "left" }}>
              <Dropdown.Button
                overlay={<Menu onClick={({ key }) => {
                  this.props.setModalVisible(key, true)
                }}>
                  <Menu.Item key="clean">批量磁盘清理</Menu.Item>
                  <Menu.Item key="update">批量检查更新</Menu.Item>
                </Menu>}
                disabled={this.state.activeItems.length === 0}
                onClick={_ => switchModal("licence")}
                type="primary">
                批量授权
                </Dropdown.Button>
            </div>
          </If>

        </div>


        {/* 设备信息列表 */}
        <TableWithRemote
          {...props}>
        </TableWithRemote>


        {/* 授权的Modal*/}
        <Modal
          width={800}
          maskClosable={false}
          closable={this.getClosableValueByKey("licence")}
          footer={null}
          onCancel={this.createOnCancelHandleByKey("licence")}
          visible={modalVisible["licence"]}
          title={<div><Icon type="lock"></Icon>&nbsp;设备授权</div>}>
          <Spin spinning={this.getLoadingStatusByKey("licence")}>
            <Licence
              key={`${this.state.lastVisibleChange}- licence`}
              onSubmit={this.onLicenceSubmit}
              onCancel={this.createOnCancelHandleByKey("licence")}
              loading={this.getLoadingStatusByKey("licence")}
              deviceList={this.state.activeItems}>
            </Licence>
          </Spin>
        </Modal>
        {/* 清理的Modal */}
        <Modal
          width={1000}
          maskClosable={false}
          footer={null}
          onCancel={this.createOnCancelHandleByKey("clean")}
          visible={modalVisible["clean"]}
          title={<div><Icon type="clear"></Icon>&nbsp;清理磁盘</div>}>
          <Spin spinning={this.getLoadingStatusByKey("clean")}>
            <Clean
              key={`${this.state.lastVisibleChange}- clean`}
              onCancel={this.createOnCancelHandleByKey("clean")}
              onSubmit={this.postClean}
              type={this.props.type}
              loading={this.getLoadingStatusByKey("clean")}
              defaultValue={{ data: this.state.activeItems }}>
            </Clean>
          </Spin>
        </Modal>


        {/* 更新的Modal*/}
        <Modal
          width={1200}
          maskClosable={false}
          closable={this.getClosableValueByKey("update")}
          footer={null}
          onCancel={this.createOnCancelHandleByKey("update")}
          visible={modalVisible["update"]}
          title={<div><Icon type="info-circle-o"></Icon>&nbsp;设备更新</div>}>
          <Spin spinning={this.getLoadingStatusByKey("update")}>
            <Update
              key={`${this.state.lastVisibleChange}- update`}
              onCancel={this.createOnCancelHandleByKey("update")}
              handle={{
                getUpdateInfoLocal: this.fetchUpdateInfoByLocal,
                getUpdateInfoRemote: this.fetchUpdateInfoByRemote,
                updateLocal: this.updateByLocal,
                updateRemote: this.updateByRemote,
              }}
              loading={this.getLoadingStatusByKey("update")}
              defaultValue={{ data: this.state.activeItems }}>
            </Update>
          </Spin>
        </Modal>
      </div>
    )
  }
}