import { getToolColumns } from '../tableConfig'
import commonTableContainerCreator from 'domainUtils/commonTableContainerCreator'
import { THREAT_EVENT_TOOL_NAMESPACE } from 'constants/model'
import { LIGHT_THEME } from 'constants/theme'
import * as React from 'react'
import LimitSelect from 'domainComponents/LimitSelect'
import TableWithRemote from 'domainComponents/TableWithRemote'
import Spin from 'domainComponents/Spin'
import WithConfig from 'domainComponents/WithConfig'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig'

const initialFilters = {
  timestampRange: [],
  limit: 20,
  page: 1,
}

@WithConfig("/static/config/table/threatEventTool.json")
export default class extends React.Component<any, any>{
  static defaultProps = {
    initialFilters: {}
  }
  constructor(props) {
    super(props)
    this.state = {
      filters: {
        ...initialFilters,
        ...props.initialFilters
      },
      lastReqTime: 0
    }
  }
  limitOnChange = (filters) => {
    this.setState({
      filters: {
        ...this.state.filters,
        ...filters,
      },
      lastReqTime: new Date().getTime()
    })
  }
  onChange = (filters) => {
    this.setState({
      filters
    })
  }
  render() {

    return (
      <div >
        <div style={{ overflow: "hidden" }}>
          <div style={{ float: "left" }}>
            <LimitSelect
              defaultValue={this.state.filters}
              onChange={this.limitOnChange}>
            </LimitSelect>
          </div>
        </div>
        <TableWithRemote
          onChange={this.onChange}
          getColumns={options => {
            return combineColumnsConfig(getToolColumns(options), this.props.config.columns)
          }}
          remoteNamespace={THREAT_EVENT_TOOL_NAMESPACE}
          theme={LIGHT_THEME}
          initialFilters={{ ...this.state.filters, ...this.props.initialFilters }}
          key={`table-con-${this.state.lastReqTime}`}>
        </TableWithRemote>
      </div>
    )
  }
}