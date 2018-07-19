import * as React from 'react'
import TableWithRemote from 'domainComponents/TableWithRemote'
import { ASSETS_LOOPHOLE_NAMESPACE, ASSETS_PORT_NAMESPACE } from 'constants/model'
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
        <h3>新增端口</h3>
        <h3>新增资产</h3>
      </div>
    )
  }
}