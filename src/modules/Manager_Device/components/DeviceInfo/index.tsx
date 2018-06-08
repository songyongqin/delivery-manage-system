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
import WithCommonProps from 'domainComponents/WithCommonProps'
import { isLicenceOverdue } from 'domain/licence'
import { debounce } from 'utils'
import { MANAGER_DEVICE_HONEYPOT_STANDALONE_NAMESPACE } from 'constants/model'

/*
* 该组件参数如下
*/
interface Props {
  //该模块是否为只读 只读将不可执行任何操作
  readonly: boolean,
  //是否支持多选操作
  multiple: boolean,
  //对应 model 的 namespace
  remoteNamespace: string,
  //获取表格列的函数
  getColumns: any,
  //是否显示分页
  pagination: boolean,
  //是否显示磁盘清理配置
  disk: boolean,
  //是否显示控制中心IP
  masterIP: boolean,
  //表格希望隐藏的列
  shouldHideCols: string[]
}

const mapStateToProps = state => {
  const { progressState } = state[MANAGER_DEVICE_HONEYPOT_STANDALONE_NAMESPACE]
  return {
    progressState,
    effectsLoading: state.loading.effects,
    overdueTipVisible: state.layout.overdueTipVisible
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    saveOverdueTipVisible: payload => dispatch({
      type: `layout/saveOverdueTipVisible`,
      payload
    })
  }
}

let tipModalRef = null

@WithCommonProps
@WithModal()
@extraConnect(mapStateToProps, mapDispatchToProps)
export default class DeviceInfo extends React.Component<any, any>{
  static defaultProps = {
    readonly: false,
    multiple: false,
    disk: true,
    masterIP: false,
    shouldHideCols: [],
    overdueTipType: false
  }
  state = {
    activeItems: [],
    items: [],
    lastReqTime: 0,
    lastVisibleChange: 0,
    modalReload: {
      licence: false,
      update: false
    },
    refreshDataOnClose: false,
    expanded: true
  }
  componentDidMount() {
    if (this.props.overdueTipVisible && this.props.mainDevice) {
      this.showOverdueTipModal()
    }
    this.initExpandedListener()
    this.adjustExpanded()
  }
  componentWillUnmount() {
    this.removeExpandedListener()
  }
  componentDidUpdate() {
    if (this.props.overdueTipVisible && this.props.mainDevice) {
      this.showOverdueTipModal()
    }
  }
  adjustExpanded = debounce(() => {
    this.setState({
      expanded: document.body.clientWidth > 1400
    })
  }, 500)
  initExpandedListener = () => {
    window.addEventListener('resize', this.adjustExpanded)
  }
  removeExpandedListener = () => {
    window.removeEventListener("resize", this.adjustExpanded)
  }
  showOverdueTipModal = () => {
    //避免重复弹出弹出框 若存在弹出框未关闭该modal 不再显示
    if (tipModalRef) {
      return
    }

    let modalType = (this.props.overdueTipType === "warning" || !this.props.admin)
      ?
      "warning"
      :
      "confirm"

    tipModalRef = Modal[modalType]({
      title: "授权已失效",
      content: this.props.overdueTipContent[this.props.admin ? "admin" : "common"],
      okText: modalType === "confirm" ? "执行授权操作" : "确定",
      cancelText: "取消",
      onOk: () => {
        //关闭弹出框后 将弹出框的实例引用释放
        tipModalRef = null
        this.props.saveOverdueTipVisible(false)
        if (modalType === "confirm") {
          this.onLicenceClick(this.state.items)
        }
      },
      onCancel: () => {
        //关闭弹出框后 将弹出框的实例引用释放
        tipModalRef = null
        this.props.saveOverdueTipVisible(false)
      }
    })
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
    if (key === "update") {

      if (this.props.progressState == 0) {
        return false
      }
      else {
        return true
      }
    }
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

  /*发送清理磁盘数据请求 */
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
  /*获取loading的状态*/
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

    }
  }

  updateRemoteProgress = payload => {
    return this.props.dispatch({
      type: `${this.props.remoteNamespace}/updateRemoteProgress`,
      payload
    })
  }
  render() {
    const { pagination, remoteNamespace, multiple, modalVisible, switchModal, disk, effectsLoading, masterIP, shouldHideCols } = this.props
    const { modalReload, lastReqTime } = this.state

    const readonly = (!this.props.admin) || this.props.readonly

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
          expanded: this.state.expanded,
          shouldHideCols: shouldHideCols
        })
      },
      onChange: this.onChange,
      onDataChange: payload => {
        this.setState({
          items: payload.data
        })
      }
    }
    /*若为多选且不为只读  则表格显示可选择的checkbox  */
    if (multiple && !readonly) {
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
                readonly={readonly}
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
                disabled={this.state.activeItems.length === 0 || readonly}
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
          destroyOnClose={true}
          closable={this.getClosableValueByKey("licence")}
          footer={null}
          onCancel={this.createOnCancelHandleByKey("licence")}
          visible={modalVisible["licence"]}
          title={<div><Icon type="lock"></Icon>&nbsp;设备授权</div>}>
          <Spin spinning={this.getLoadingStatusByKey("licence")}>
            <Licence
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
          destroyOnClose={true}
          footer={null}
          onCancel={this.createOnCancelHandleByKey("clean")}
          visible={modalVisible["clean"]}
          title={<div><Icon type="clear"></Icon>&nbsp;清理磁盘</div>}>
          <Spin spinning={this.getLoadingStatusByKey("clean")}>
            <Clean
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
          destroyOnClose={this.props.progressState == 0 ? false : true}
          maskClosable={false}
          closable={this.getClosableValueByKey("update")}
          footer={null}
          onCancel={this.createOnCancelHandleByKey("update")}
          visible={modalVisible["update"]}
          title={<div><Icon type="info-circle-o"></Icon>&nbsp;设备更新</div>}>
          <Spin spinning={this.getLoadingStatusByKey("update")}>
            <Update
              onCancel={this.createOnCancelHandleByKey("update")}
              handle={{
                getUpdateInfoLocal: this.fetchUpdateInfoByLocal,
                getUpdateInfoRemote: this.fetchUpdateInfoByRemote,
                updateRemoteProgress: this.updateRemoteProgress,
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