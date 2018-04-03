import * as React from 'react'
import classnames from 'classnames'
import { Menu, Button, Icon, Row, Col, message as Message, Modal } from 'antd'
import Spin from 'domainComponents/Spin'
import Table from 'domainComponents/Table'
import * as tableConfig from './components/TableConfig/index'
import { USER_MANAGER_NAMESPACE } from 'constants/model'
import TableWithRemote from 'domainComponents/TableWithRemote'
import WithAnimateRender from 'components/WithAnimateRender'
import Card from 'domainComponents/Card'

@WithAnimateRender
export default class UserManager extends React.Component<any, any>{
  render() {
    return <div>
      {
        this.props.animateRender([
          <Card>
            <TableWithRemote
              remoteNamespace={USER_MANAGER_NAMESPACE}
              getColumns={tableConfig.getColumns}
              initialFilters={{ page: 1, limit: 10 }}>
            </TableWithRemote>
          </Card>
        ])
      }
    </div>
  }
}