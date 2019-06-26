import CommonItem from '../CommonItem'
import * as React from 'react'
import { getColumns } from './tableConfig'
import SelectForm from './SelectForm'
import WithConfig from 'domainComponents/WithConfig'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig'
import path from 'constants/path'
import extraConnect from 'domainUtils/extraConnect'
import { AUDIT_EVENT_NAMESPACE } from 'constants/model'
import transformTimeStamp from 'utils/transformTimeStamp'

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

      post: payload => dispatch(
        {
          type: `${AUDIT_EVENT_NAMESPACE}/post`,
          payload
        }
      )
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
    this.props.save({ ...initial, ...filters, timestampRange: this.props.timestampRange })
    this.setState({
      lastReqTime: new Date().getTime()
    })
  }

  download = (obj) => {
   return this.props.post({...obj, timestampRange: transformTimeStamp(this.props.timestampRange)})
  }

  render() {
    const { initialFilters } = this.props;
    const { timestampRange } = this.state
    return <CommonItem
      key={`${this.state.lastReqTime}-item`}
      expandPanel={
        <SelectForm
          onSubmit={this.onSubmit}
          defaultValue={{ ...initialFilters, ...initialFilters.protocolType }}
        >
        </SelectForm>
      }
      initialFilters={{ ...this.props.initialFilters, timestampRangexx:timestampRange }}
      remoteNamespace={AUDIT_EVENT_NAMESPACE}
      download = { this.download }
      getColumns={option => {
        return combineColumnsConfig(getColumns(option), this.props.config.columns)
      }}>
    </CommonItem>
  }
}