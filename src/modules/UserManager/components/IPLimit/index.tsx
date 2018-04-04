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

function mapStateToProps(state) {
  const effectLoading = state.loading.effects
  return {
    loading: effectLoading[`${USER_MANAGER_IP_LIMIT_NAMESPACE}/delete`] ||
      effectLoading[`${USER_MANAGER_IP_LIMIT_NAMESPACE}/put`] ||
      effectLoading[`${USER_MANAGER_IP_LIMIT_NAMESPACE}/post`]
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


class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      activeType: null,
    }
  }
  render() {



    const title = (
      <div><Icon type="filter" />
        &nbsp;限制IP登录范围
        {/* <span style={{ paddingLeft: "15px" }}>
          <Tooltip title={disabled ? "管理员无IP范围设置，无法开启该功能" : null}>
            <Switch checkedChildren={"开"}
              unCheckedChildren={"关"}
              disabled={disabled}
              onChange={this.onOpenChange}
              defaultChecked={isOpen} />
          </Tooltip>
        </span> */}
      </div>
    )


    return (
      <div>
        <Card title={title} >
          <TableWithRemote
            pagination={false}
            getColumns={tableConfig.getColumns}
            remoteNamespace={USER_MANAGER_IP_LIMIT_NAMESPACE}>
          </TableWithRemote>
        </Card>
        {/* <Modal visible={this.state.visible}
          footer={null}
          key={`${this.state.visible}-modal`}
          onCancel={this.switchModal}
          title={<p><Icon type="plus" />&nbsp;添加IP</p>}>
          <AddIpLimitForm isDark={isDark}
            onSubmit={this.onPostHandle}
            loading={loading}
            ipList={(data.find(i => i.role === this.state.activeType) || {}).ipRange} />
        </Modal> */}
      </div>
    )
  }
}

export default Page