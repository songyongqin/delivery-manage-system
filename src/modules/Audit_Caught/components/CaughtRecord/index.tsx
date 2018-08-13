import * as React from 'react'
import { Button, Row, Col, Modal, message } from 'antd'
import TableWithRemote from 'domainComponents/TableWithRemote'
import { getColumns } from './tableConfig'
import { AUDIT_CAUGHTRECORD_NAMESPACE } from 'constants/model'
import TimeLabel from 'domainComponents/TimeLabel'
const styles = require('./style.less')

import extraConnect from 'domainUtils/extraConnect'


export default class CommonItem extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      initialFilters: {
        page: 1,
        limit: 15,
      },
      lastReqTime: 0,
    }
  }
  setinitialFilters = (payload) => {
    const { initialFilters } = this.state;
    this.setState({ initialFilters: { ...initialFilters, ...payload } })
  }
  render() {
    return (
      <div>
        <TableWithRemote
          key={`${this.state.lastReqTime}-table`}
          onChange={payload => this.setinitialFilters(payload)}
          initialFilters={this.state.initialFilters}
          getColumns={options => getColumns({
            ...options,
            initialFilters: this.state.initialFilters
          })}
          remoteNamespace={AUDIT_CAUGHTRECORD_NAMESPACE}>
          ></TableWithRemote>

      </div>
    )
  }
}