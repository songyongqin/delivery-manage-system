import { getColumns } from './tableConfig'
import { fetchLastEvent } from './services'
import { LAST_EVENT_NAMESPACE } from 'constants/model'
import TableWithRemote from 'domainComponents/TableWithRemote'
import React from 'react'

const initialFilters = {
  timestampRange: [],
  attackStage: [],
  action: [],
  level: [],
  actionStatus: [],
  limit: 5,
  page: 1,
}

export default class LastEvent extends React.PureComponent<any, any>{
  static defaultProps = {
    initialFilters: {}
  }
  render() {

    return (
      <TableWithRemote
        getColumns={getColumns}
        remoteNamespace={LAST_EVENT_NAMESPACE}
        initialFilters={{
          ...initialFilters,
          ...this.props.initialFilters,
        }}>
      </TableWithRemote>
    )
  }
}