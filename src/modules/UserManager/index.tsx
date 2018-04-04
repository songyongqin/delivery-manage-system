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
import IPLimit from './components/IPLimit'
import User from './components/User'

@WithAnimateRender
export default class UserManager extends React.Component<any, any>{

  render() {

    return <div>
      {
        this.props.animateRender([
          <div style={{ marginBottom: "15px" }} key="ip-limit">
            <IPLimit></IPLimit>
          </div>,
          <div style={{ marginBottom: "15px" }} key="user">
            <User></User>
          </div>
        ])
      }
    </div>
  }
}