import { getColumns, getColumns_port } from './tableConfig'
import TableWithRemote from 'domainComponents/TableWithRemote'
import { ASSETS_DETAIL_NAMESPACE, ASSETS_PORTDETAIL_NAMESPACE } from 'constants/model'
import React from 'react'
import Card from 'domainComponents/Card'

export default class LastEvent extends React.PureComponent<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      initialFilters: {
        page: 1,
        limit: 20,
      }
    }
  }
  render() {
    const scanTime = this.props.scanTime;
    return (
      <div style={{ width: "90%", marginLeft: "5%" }}>
        <h3>新增资产</h3>
        <TableWithRemote
          getColumns={getColumns}
          remoteNamespace={ASSETS_DETAIL_NAMESPACE}
          initialFilters={{
            ...this.state.initialFilters,
            scanTime: scanTime
          }}>
        </TableWithRemote>

        <h3 style={{ marginTop: "20px" }}>新增端口</h3>
        <TableWithRemote
          getColumns={getColumns_port}
          remoteNamespace={ASSETS_PORTDETAIL_NAMESPACE}
          initialFilters={{
            scanTime: scanTime,
            ...this.state.initialFilters,
          }}>
        </TableWithRemote>

      </div>
    )
  }
}