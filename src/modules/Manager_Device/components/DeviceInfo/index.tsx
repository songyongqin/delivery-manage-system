import * as React from 'react'
import extraConnect from 'domainUtils/extraConnect'
import { getColumns } from '../../tableConfig'
import TableWithRemote from 'domainComponents/TableWithRemote'
const styles = require('./styles.less')
import DiskClear from './DiskClear'
import { Modal, Icon, Menu, Dropdown } from 'antd'
import WithModal from 'components/WithModal'
import Licence from './Licence'
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
    disk: true
  }
  state = {
    activeItems: [],
    lastReqTime: 0,
    lastVisibleChange: 0,
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
  onLicenceSubmit = payload => {
    console.info(payload)
  }
  render() {
    const { pagination, remoteNamespace, multiple, modalVisible, switchModal, disk } = this.props

    let props: any = {
      pagination,
      remoteNamespace,
      getColumns: (options) => {
        return getColumns({
          ...options,
          handle: {
            licence: this.onLicenceClick
          }
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
                  console.info(key)
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


        <TableWithRemote
          {...props}>
        </TableWithRemote>

        <Modal
          width={800}
          maskClosable={false}
          footer={null}
          onCancel={_ => {
            switchModal("licence")
            setTimeout(() => {
              this.setState({
                lastVisibleChange: new Date().getTime()
              })
            }, 100)
          }}
          visible={modalVisible["licence"]}
          title={<div><Icon type="lock"></Icon>&nbsp;设备授权</div>}>
          <Licence
            key={`${this.state.lastVisibleChange}- licence`}
            onSubmit={this.onLicenceSubmit}
            deviceList={this.state.activeItems}>
          </Licence>
        </Modal>
      </div>
    )
  }
}