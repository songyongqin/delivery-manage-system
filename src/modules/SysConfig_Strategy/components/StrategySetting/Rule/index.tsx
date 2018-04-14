import * as React from 'react'
import TableWithRemote from 'domainComponents/TableWithRemote'
import { SYS_CONFIG_STRATEGY_RULE } from 'constants/model'
import { getColumns } from './tableConfig'
import Card from 'domainComponents/Card'

export default class Rule extends React.Component<any, any>{
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Card >
        <TableWithRemote
          getColumns={getColumns}
          remoteNamespace={SYS_CONFIG_STRATEGY_RULE}>
        </TableWithRemote>
      </Card>
    )
  }
}