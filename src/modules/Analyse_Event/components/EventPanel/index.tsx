import * as tableConfig from '../TableConfig'
import {

  NAMESPACE,
} from '../../constants'
import * as React from 'react'

import TableWithRemote from 'domainComponents/TableWithRemote'

const initialFilters = {
  timestampRange: [],
  mergeCounts: 10,
  attackStage: [],
  action: [],
  level: [],
  actionStatus: [],
  limit: 20,
  page: 1,

}

export default class EventPanel extends React.Component<any, any> {
  static defaultProps = {
    initialFilters: {}
  }
  render() {
    return (
      <TableWithRemote
        initialFilters={{
          ...initialFilters,
          ...this.props.initialFilters,
        }}
        getExpandedRowRenderer={tableConfig.getExpandedRowRender}
        getColumns={tableConfig.getColumns}
        remoteNamespace={NAMESPACE}
      />
    )
  }
}