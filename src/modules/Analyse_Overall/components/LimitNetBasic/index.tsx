import CommonItem from '../CommonItem'
import * as React from 'react'
import { ANALYSE_OVERALL_SYSTEM_NAMESPACE } from 'constants/model'
import { getColumns } from './tableConfig'

export default class System extends React.Component<any, any>{
  constructor(props) {
    super(props)
  }
  render() {
    return <CommonItem
      initialFilters={this.props.initialFilters}
      remoteNamespace={ANALYSE_OVERALL_SYSTEM_NAMESPACE}
      getColumns={getColumns}>
    </CommonItem>
  }
}