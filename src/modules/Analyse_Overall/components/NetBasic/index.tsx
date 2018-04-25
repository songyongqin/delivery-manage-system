import CommonItem from '../CommonItem'
import * as React from 'react'
import { ANALYSE_OVERALL_NET_BASIC_NAMESPACE } from 'constants/model'
import { getColumns } from './tableConfig'
import SelectForm from './SelectForm'
import WithConfig from 'domainComponents/WithConfig'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig'
import path from 'constants/path'

@WithConfig(path.layoutConfig.networkBasic)
export default class System extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      filters: {
        protocolType: "HTTP"
      },
      lastReqTime: 0
    }
  }
  onSubmit = filters => {
    this.setState({
      filters,
      lastReqTime: new Date().getTime()
    })
  }
  render() {
    return <CommonItem
      key={`${this.state.lastReqTime}-item`}
      expandPanel={
        <SelectForm
          onSubmit={this.onSubmit}
          defaultValue={{ ...this.props.initialFilters, ...this.state.filters }}>
        </SelectForm>
      }
      initialFilters={{ ...this.props.initialFilters, ...this.state.filters }}
      remoteNamespace={ANALYSE_OVERALL_NET_BASIC_NAMESPACE}
      getColumns={option => {
        return combineColumnsConfig(getColumns(option), this.props.config.columns)
      }}>
    </CommonItem>
  }
}