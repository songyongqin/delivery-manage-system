import * as React from 'react'
import TableWithRemote from 'domainComponents/TableWithRemote'
import LimitForm from './LimitForm'

export default class CommonItem extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      filters: { limit: 10 },
      lastReqTime: 0
    }
  }
  onSubmit = filters => {
    this.setState({
      filters,
      lastReqTime: new Date().getTime(),
    })
  }
  render() {
    return (
      <div>
        <div style={{ overflow: "hidden" }}>
          <div style={{ float: "left" }}>
            {this.props.expandPanel}
          </div>
          <div style={{ float: "left" }}>
            <LimitForm onSubmit={this.onSubmit}></LimitForm>
          </div>

        </div>
        <TableWithRemote
          key={`${this.state.lastReqTime}-table`}
          initialFilters={{ ...this.props.initialFilters, ...this.state.filters }}
          getColumns={this.props.getColumns}
          remoteNamespace={this.props.remoteNamespace}>
        </TableWithRemote>
      </div>
    )
  }
}