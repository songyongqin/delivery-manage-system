import * as React from 'react'
import Card from 'domainComponents/Card'
import TableWithRemote from 'domainComponents/TableWithRemote'
import { getColumns } from "./tableConfig"
import { SYS_CONFIG_STRATEGY_WHITE_LIST } from 'constants/model'
import PostForm from './PostForm'
import WithModal from 'components/WithModal'
import extraConnect from 'domainUtils/extraConnect'
import { Button, Icon, Modal, message as Message } from 'antd'
import Spin from 'domainComponents/Spin'

const mapStateToProps = state => {
  const effectsLoading = state.loading.effects
  return {
    postLoading: effectsLoading[`${SYS_CONFIG_STRATEGY_WHITE_LIST}/post`],
    putLoading: effectsLoading[`${SYS_CONFIG_STRATEGY_WHITE_LIST}/put`],
    deleteLoading: effectsLoading[`${SYS_CONFIG_STRATEGY_WHITE_LIST}/delete`],
    applyLoading: effectsLoading[`${SYS_CONFIG_STRATEGY_WHITE_LIST}/apply`],
    fetchLoading: effectsLoading[`${SYS_CONFIG_STRATEGY_WHITE_LIST}/fetch`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    post: payload => dispatch({
      type: `${SYS_CONFIG_STRATEGY_WHITE_LIST}/post`,
      payload
    }),
    delete: payload => dispatch({
      type: `${SYS_CONFIG_STRATEGY_WHITE_LIST}/delete`,
      payload
    }),
    put: payload => dispatch({
      type: `${SYS_CONFIG_STRATEGY_WHITE_LIST}/put`,
      payload
    }),
    apply: payload => dispatch({
      type: `${SYS_CONFIG_STRATEGY_WHITE_LIST}/apply`,
      payload
    })
  }
}

@extraConnect(mapStateToProps, mapDispatchToProps)
@WithModal()
export default class WhiteList extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      activeItems: [],
      lastReqTime: 0
    }
  }
  reload = () => {
    this.setState({
      activeItems: [],
      lastReqTime: new Date().getTime()
    })
  }
  onSubmit = payload => {
    this.props.post(payload).then(_ => {
      Message.success("添加成功")
      this.props.setModalVisible("create", false)
      this.reload()
    })
  }
  onDel = payload => {
    this.props.delete(payload).then(_ => Message.success("删除成功"))
  }
  onPut = payload => {
    this.props.put(payload).then(_ => Message.success("修改成功"))
  }
  onMulClick = value => {
    const payload = this.state.activeItems.reduce((target, item) => {
      target[value["id"]] = value ? 1 : 0
      return target
    }, {})
    this.props.put(payload).then(_ => {
      Message.success("修改成功")
      this.reload()
    })
  }
  render() {
    const { postLoading, putLoading, applyLoading, deleteLoading, fetchLoading } = this.props
    const { activeItems } = this.state
    const title = (
      <div style={{ overflow: "hidden" }}>
        <div style={{ float: "left" }}>
          <Button.Group>
            <Button
              onClick={_ => this.onMulClick(true)}
              type="primary"
              disabled={applyLoading || putLoading || deleteLoading || fetchLoading || activeItems.length === 0}>
              <Icon type="check" />启用
          </Button>
            <Button type="danger"
              onClick={_ => this.onMulClick(false)}
              disabled={applyLoading || putLoading || deleteLoading || fetchLoading || activeItems.length === 0}
              className="btn-danger">
              关闭<Icon type="close" />
            </Button>
          </Button.Group>
          <Button type="primary"
            icon="plus"
            disabled={applyLoading || putLoading || deleteLoading || fetchLoading}
            onClick={_ => this.props.setModalVisible("create", true)}
            style={{ marginLeft: "15px" }}>
            新增白名单
        </Button>
        </div>
        <div style={{ float: "right" }}>
          <Button type="primary"
            disabled={putLoading || deleteLoading || fetchLoading}
            loading={applyLoading}
            onClick={_ => this.props.apply()}
            icon="save">
            应用
        </Button>
        </div>
      </div>
    )

    return (
      <div style={{ padding: "5px" }}>
        <Card title={title}>
          <TableWithRemote
            key={`${this.state.lastReqTime}-table`}
            rowSelection={{
              onChange: (_, activeItems) => {
                this.setState({
                  activeItems
                })
              }
            }}
            loading={applyLoading || putLoading || deleteLoading || fetchLoading}
            remoteNamespace={SYS_CONFIG_STRATEGY_WHITE_LIST}
            pagination={false}
            getColumns={option => {
              return getColumns({
                ...option, handle: {
                  delete: this.onDel,
                  put: this.onPut
                }
              })
            }}>
          </TableWithRemote>
        </Card>
        <Modal
          title={
            <div><Icon type="plus"></Icon>&nbsp;添加白名单</div>
          }
          closable={!postLoading}
          onCancel={_ => this.props.setModalVisible("create", false)}
          visible={this.props.modalVisible["create"]}
          footer={null}
          destroyOnClose={true} >
          <PostForm onSubmit={this.onSubmit} loading={postLoading}></PostForm>
        </Modal>
      </div>
    )
  }
} 