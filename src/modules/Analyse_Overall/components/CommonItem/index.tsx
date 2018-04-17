import * as React from 'react'
import TableWithRemote from 'domainComponents/TableWithRemote'

export default class CommonItem extends React.Component<any, any>{
  constructor(props) {
    super(props)
  }
  render() {


    return (
      <div>
        <TableWithRemote
          getColumns={this.props.getColumns}
          remoteNamespace={this.props.remoteNamespace}>
        </TableWithRemote>
      </div>
    )
  }
}