import CommonItem from '../CommonItem'
import * as React from 'react'
import { ANALYSE_OVERALL_PCAP_NAMESPACE } from 'constants/model'
import { getColumns } from './tableConfig'
import WithConfig from 'domainComponents/WithConfig'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig'
import path from 'constants/path'

@WithConfig(path.layoutConfig.pcap)
export default class System extends React.Component<any, any>{
  constructor(props) {
    super(props)
  }
  render() {
    return <CommonItem
      initialFilters={this.props.initialFilters}
      remoteNamespace={ANALYSE_OVERALL_PCAP_NAMESPACE}
      getColumns={option => {
        return combineColumnsConfig(getColumns(option), this.props.config.columns)
      }}>
    </CommonItem>
  }
}