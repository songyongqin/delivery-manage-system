import * as React from 'react'
import classnames from 'classnames'
import { Menu, Button, Icon, Row, Col, message as Message, Modal } from 'antd'
import Spin from 'domainComponents/Spin'
import Table from 'domainComponents/Table'
import { USER_MANAGER_NAMESPACE } from 'constants/model'
import TableWithRemote from 'domainComponents/TableWithRemote'
import WithAnimateRender from 'components/WithAnimateRender'
import Card from 'domainComponents/Card'
import WithModal from 'components/WithModal'
import * as tableConfig from './tableConfig'
import UserForm from './UserForm'
import extraConnect from 'domainUtils/extraConnect'

const mapStateToProps = state => {
  const effectsLoading = state.loading.effects
  return {
    editLoading: effectsLoading[`${USER_MANAGER_NAMESPACE}/putUser`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postUser: payload => dispatch({
      type: `${USER_MANAGER_NAMESPACE}/postUser`,
      payload
    }),
    putUser: payload => dispatch({
      type: `${USER_MANAGER_NAMESPACE}/putUser`,
      payload
    }),
    delUser: payload => dispatch({
      type: `${USER_MANAGER_NAMESPACE}/delUser`,
      payload
    }),
    resetUser: payload => dispatch({
      type: `${USER_MANAGER_NAMESPACE}/patchUser`,
      payload
    })
  }
}

@extraConnect(mapStateToProps, mapDispatchToProps)
@WithModal()
@WithAnimateRender
export default class UserManager extends React.Component<any, any>{
  state = {
    activeItem: {},
    lastReqTime: 0
  }
  onFreezeClick = payload => {
    Modal.confirm({
      content: `用户 ${payload.userAccount} 将被解除冻结`,
      onOk: _ => this.props.putUser({
        userAccount: payload.userAccount,
        freeze: 0
      })
        .then(_ => Message.success("修改成功"))
        .then(_ => this.setState({ lastReqTime: new Date().getTime() }))
    })
  }
  onEditClick = activeItem => {
    this.setState({
      activeItem
    })
    this.props.setModalVisible("edit", true)
  }
  onDelClick = payload => {
    Modal.confirm({
      content: `用户 ${payload.userAccount} 信息将被删除，不可恢复`,
      onOk: _ => this.props.delUser({ userAccount: payload.userAccount })
        .then(_ => Message.success("删除用户成功"))
        .then(_ => this.setState({ lastReqTime: new Date().getTime() }))
    })
  }
  onResetClick = payload => {
    Modal.confirm({
      content: `用户 ${payload.userAccount} 密码将被重置`,
      onOk: _ => this.props.delUser({ userAccountList: [payload.userAccount] })
        .then(_ => Message.success("重置密码成功"))
        .then(_ => this.setState({ lastReqTime: new Date().getTime() }))
    })
  }
  onEdit = payload => {
    this.props.putUser(payload)
      .then(_ => {
        Message.success("修改成功")
        this.props.setModalVisible("edit", false)
      })
  }
  render() {
    const { modalVisible, setModalVisible, effectsLoading, editLoading } = this.props
    const { lastReqTime } = this.state

    return (
      <Card
        key="user"
        title={<div><Icon type="team"></Icon>&nbsp;用户管理</div>}>
        <TableWithRemote
          key={`${lastReqTime}-user`}
          remoteNamespace={USER_MANAGER_NAMESPACE}
          getColumns={options => {
            return tableConfig.getColumns({
              ...options,
              handle: {
                freeze: this.onFreezeClick,
                edit: this.onEditClick,
                delete: this.onDelClick,
                reset: this.onResetClick
              }
            })
          }}
          initialFilters={{ page: 1, limit: 10 }}>
        </TableWithRemote>

        <Modal
          onCancel={_ => {
            setModalVisible("edit", false)
          }}
          title={<div><Icon type="edit"></Icon>&nbsp;修改用户信息</div>}
          visible={modalVisible["edit"]}
          footer={null}>
          <UserForm
            loading={editLoading}
            key={`${modalVisible["edit"]}-user-form`}
            isCreate={false}
            onSubmit={this.onEdit}
            defaultValue={this.state.activeItem}>
          </UserForm>
        </Modal>
      </Card>
    )
  }
}