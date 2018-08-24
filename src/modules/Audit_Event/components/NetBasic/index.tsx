import CommonItem from '../CommonItem'
import * as React from 'react'
import { getColumns } from './tableConfig'
import SelectForm from './SelectForm'
import WithConfig from 'domainComponents/WithConfig'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig'
import path from 'constants/path'
import extraConnect from 'domainUtils/extraConnect'
import { AUDIT_EVENT_NAMESPACE } from 'constants/model'
@extraConnect(
  state => {
    return {
      initialFilters: state[AUDIT_EVENT_NAMESPACE].initialFilters,
      initial: state[AUDIT_EVENT_NAMESPACE].initial
    }
  },
  dispatch => {
    return {

      save: payload => dispatch(
        {
          type: `${AUDIT_EVENT_NAMESPACE}/save`,
          payload
        }
      ),
    }
  }
)
@WithConfig(path.layoutConfig.auditEvent)
export default class System extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      // filters: {
      //   protocolType: "HTTP"
      // },
      lastReqTime: 0
    }
  }
  onSubmit = filters => {

    const { initial } = this.props;
    this.props.save({ ...initial, ...filters, })
    this.setState({
      lastReqTime: new Date().getTime()
    })
  }
  render() {
    const { initialFilters } = this.props;
    return <CommonItem
      key={`${this.state.lastReqTime}-item`}
      expandPanel={
        <SelectForm
          onSubmit={this.onSubmit}
          defaultValue={{ ...initialFilters, ...initialFilters.protocolType }}
        >
        </SelectForm>
      }
      initialFilters={{ ...this.props.initialFilters }}
      remoteNamespace={AUDIT_EVENT_NAMESPACE}
      getColumns={option => {
        return combineColumnsConfig(getColumns(option), this.props.config.columns)
      }}>
    </CommonItem>
  }
}