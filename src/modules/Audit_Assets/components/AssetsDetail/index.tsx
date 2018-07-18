import { getColumns, getColumns_port } from './tableConfig'
import TableWithRemote from 'domainComponents/TableWithRemote'
import { ASSETS_LOOPHOLE_NAMESPACE, ASSETS_PORT_NAMESPACE } from 'constants/model'
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
    return (
      <div style={{ width: "90%", marginLeft: "5%" }}>
        <h3>漏洞列表</h3>
        <TableWithRemote
          getColumns={getColumns}
          remoteNamespace={ASSETS_LOOPHOLE_NAMESPACE}
          initialFilters={{
            ...this.state.initialFilters,
          }}>
        </TableWithRemote>

        <h3 style={{ marginTop: "20px" }}>端口列表</h3>
        <TableWithRemote
          getColumns={getColumns_port}
          remoteNamespace={ASSETS_PORT_NAMESPACE}
          initialFilters={{
            ...this.state.initialFilters,
          }}>
        </TableWithRemote>

      </div>
    )
  }
}