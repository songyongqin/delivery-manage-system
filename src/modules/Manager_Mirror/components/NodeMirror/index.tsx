import * as React from 'react'
import TableWithRemote from 'domainComponents/TableWithRemote'
import { MANAGER_MIRROR_NODE_NAMESPACE, MANAGER_MIRROR_OPERATION_NAMESPACE } from 'constants/model'
import TagList from 'components/TagList'
import { Button, Modal } from 'antd'
import NodeUpdateResultPanel from '../NodeUpdateResultPanel'
import extraConnect from 'domainUtils/extraConnect'
import WithModal from 'components/WithModal'
import Spin from 'domainComponents/Spin'
import { If, Choose, When, Otherwise } from 'components/ControlStatements'

const getColumns = ({ handle, readonly }) => {
  return [
    {
      title: '主机IP',
      dataIndex: 'hostIp',
      key: 'hostIp',
    }, {
      title: '本机镜像种类数量',
      dataIndex: 'nodeMirrorCounts',
      key: 'nodeMirrorCounts',
    }, {
      title: '控制中心镜像种类数量',
      dataIndex: 'controlMirrorCounts',
      key: 'controlMirrorCounts',
    }, {
      title: '未更新镜像名称列表',
      dataIndex: 'notUpdateList',
      key: 'notUpdateList',
      render: record => {
        return <TagList data={record} maxCount={4}></TagList>
      }
    },
    {
      title: '操作',
      key: 'interaction',
      render: records => {
        return <Button
          disabled={readonly}
          type="primary"
          onClick={_ => handle && handle["update"] && handle["update"](records)}>升级镜像</Button>
      }
    }
  ]
}

@WithModal()
@extraConnect(
  state => {
    return {
      loading: state.loading.effects[`${MANAGER_MIRROR_OPERATION_NAMESPACE}/updateNodeMirror`]
    }
  },
  dispatch => {
    return {
      updateNodeMirror: payload => dispatch({
        type: `${MANAGER_MIRROR_OPERATION_NAMESPACE}/updateNodeMirror`,
        payload
      })
    }
  }
)
export default class Summary extends React.Component<any, any>{
  state = {
    result: [],
    lastReqTime: 0,
    activeItems: []
  }
  onConfirm = payload => {
    this.props.setModalVisible("update", false)
    this.setState({
      activeItems: [],
      lastReqTime: new Date().getTime()
    })
  }
  onUpdateClick = (payload) => {
    this.update([payload])
    this.props.setModalVisible("update", true)
  }
  update = payloadList => {
    return this.props.updateNodeMirror({ idList: payloadList.map(i => i.id) })
      .then(result => {
        this.setState({
          result: result.map(item => ({
            "hostIp": (payloadList.find(i => i.id === item.id) || {})["hostIp"],
            ...item,
            add: (item.payload || {}).add || [],
            remove: (item.payload || {}).remove || []
          }))
        })
      })
      .then(result => {
        this.setState({
          activeItems: [],
        })
      })
  }
  updateMultiple = _ => {
    this.props.setModalVisible("update", true)
    this.update(this.state.activeItems).then(_ => {
      this.setState({
        activeItems: []
      })
    })
  }
  render() {


    const tableProps = {
      key: `${this.state.lastReqTime}-table`,
      getColumns: option => {
        return getColumns({
          ...option,
          readonly: this.props.readonly,
          handle: {
            update: this.onUpdateClick
          }
        })
      },
      remoteNamespace: MANAGER_MIRROR_NODE_NAMESPACE
    }

    if (!this.props.readonly) {
      tableProps["rowSelection"] = {
        onChange: (selectedRowKeys, selectedRows) => {
          this.setState({
            activeItems: selectedRows
          })
        }
      }
    }

    return (
      <div>
        <h3>蜜罐节点镜像状态</h3>
        <If condition={!this.props.readonly}>
          <div style={{ overflow: "hidden" }}>
            <Button
              disabled={this.state.activeItems.length === 0}
              type="primary"
              style={{ float: "right" }}
              onClick={this.updateMultiple}>
              升级蜜罐节点镜像
          </Button>
          </div>
        </If>
        <TableWithRemote
          {...tableProps}>
        </TableWithRemote>
        <Modal
          destroyOnClose={true}
          footer={null}
          closable={!this.props.loading}
          visible={this.props.modalVisible["update"]}
          onCancel={_ => this.props.setModalVisible("update", false)}
          title="升级蜜罐节点镜像">
          <Choose>
            <When condition={this.props.loading}>
              <Spin spinning={true}>
                <div style={{ height: "240px" }}></div>
              </Spin>
            </When>
            <Otherwise>
              <NodeUpdateResultPanel
                data={this.state.result}
                onConfirm={this.onConfirm}>
              </NodeUpdateResultPanel>
            </Otherwise>
          </Choose>
        </Modal>
      </div>
    )
  }
}