import * as React from 'react'
import styles from './styles.css'
import classnames from 'classnames'
import { Modal, Menu, Button, Icon, Row, Col, message as Message, Switch, Tooltip, notification as Notification } from 'antd'
import Spin from 'domainComponents/Spin'
import Table from 'domainComponents/Table'
import * as tableConfig from './tableConfig'
import {
  IS_OPEN,
  IS_NOT_OPEN,
  OPEN_DATAINDEX
} from '../../constants'
import * as tools from 'utils/tools'
import Card from 'domainComponents/Card'
import AddIpLimitForm from '../AddIpLimitForm'
import { ADMIN_ROLE } from 'constants/user'
import { USER_MANAGER_IP_LIMIT_NAMESPACE } from 'constants/model'
import TableWithRemote from 'domainComponents/TableWithRemote'
import WithModal from 'components/WithModal'
import extraConnect from 'domainUtils/extraConnect'
import { Choose, When, Otherwise } from 'components/ControlStatements'

Notification.config({
  placement: 'bottomRight',
  bottom: 50,
})

function mapStateToProps(state) {
  const effectLoading = state.loading.effects
  return {
    loading: effectLoading[`${USER_MANAGER_IP_LIMIT_NAMESPACE}/delete`] ||
      effectLoading[`${USER_MANAGER_IP_LIMIT_NAMESPACE}/put`] ||
      effectLoading[`${USER_MANAGER_IP_LIMIT_NAMESPACE}/post`],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    delete: payload => dispatch({
      type: `${USER_MANAGER_IP_LIMIT_NAMESPACE}/delete`,
      payload,
    }),
    put: payload => dispatch({
      type: `${USER_MANAGER_IP_LIMIT_NAMESPACE}/put`,
      payload,
    }),
    post: payload => dispatch({
      type: `${USER_MANAGER_IP_LIMIT_NAMESPACE}/post`,
      payload
    })
  }
}

@extraConnect(mapStateToProps, mapDispatchToProps)
@WithModal()
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      hasRegIPList: [],
      type: null,
      lastReqTime: 0,
      data: [],
      open: 0,
      initial: false
    }
  }
  onAddClick = item => {
    this.setState({
      hasRegIPList: item.ipRange,
      type: item.role
    })
    this.props.setModalVisible("add", true)
  }

  onDelClick = payload => this.props.delete(payload)
    .then(_ => {
      Message.success("删除成功")
      this.setState({
        lastReqTime: new Date().getTime()
      })
    })

  onSubmit = payload => this.props.post({
    ...payload,
    type: this.state.type
  })
    .then(_ => {
      Message.success("添加成功")
      this.props.setModalVisible("add", false)
      this.setState({
        lastReqTime: new Date().getTime()
      })
    })

  onDataChange = payload => {
    this.setState({
      data: payload.data,
      open: payload.open,
      initial: true
    })
  }

  onOpenChange = value => {
    this.props.put({
      open: value ? 1 : 0
    })
    if (value) {
      Notification["warning"]({
        message: '警告',
        description: '该系统仅可在限制的IP范围内登录',
        duration: 5,
      })
    }
  }

  render() {

    const { initial } = this.state
    const disabled = this.state.data.filter(i => i.role === "admin").some(i => i.ipRange.length === 0) || this.props.loading

    const title = (
      <div><Icon type="filter" />
        &nbsp;限制IP登录范围&nbsp;&nbsp;
        <Choose>
          <When condition={initial}>
            <Tooltip title={disabled ? "管理员无IP范围设置，无法开启该功能" : null}>
              <span>
              <Switch checkedChildren={"开"}
                unCheckedChildren={"关"}
                disabled={disabled}
                onChange={this.onOpenChange}
                defaultChecked={this.state.open === 1}
              />
              </span>
            </Tooltip>
          </When>
          <Otherwise>
            <Icon type="loading"></Icon>
          </Otherwise>
        </Choose>
      </div>
    )

    return (
      <Card title={title} >
        <Spin spinning={this.props.loading}>
          <TableWithRemote
            key={`${this.state.lastReqTime}-table`}
            onDataChange={this.onDataChange}
            pagination={false}
            getColumns={options => {
              return tableConfig.getColumns({
                ...options,
                handle: {
                  add: this.onAddClick,
                  delete: this.onDelClick
                }
              })
            }}
            remoteNamespace={USER_MANAGER_IP_LIMIT_NAMESPACE}>
          </TableWithRemote>
        </Spin>
        <Modal
          visible={this.props.modalVisible["add"]}
          destroyOnClose={true}
          footer={null}
          onCancel={_ => this.props.setModalVisible("add", false)}
          title={<div><Icon type="plus" />&nbsp;添加IP</div>}>
          <AddIpLimitForm
            onSubmit={this.onSubmit}
            loading={this.props.loading}
            ipList={this.state.hasRegIPList} />
        </Modal>
      </Card>

    )
  }
}

export default Page