import * as tableConfig from '../TableConfig'
import {
  NAMESPACE,
} from '../../constants'
import * as React from 'react'

import TableWithRemote from 'domainComponents/TableWithRemote'
import WithConfig from 'domainComponents/WithConfig'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig'
import path from 'constants/path'

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

@WithConfig(path.layoutConfig.analyseEvent)
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
        getColumns={options => {
          return combineColumnsConfig(tableConfig.getColumns(options), this.props.config.columns)
        }}
        remoteNamespace={NAMESPACE}
      />
    )
  }
}