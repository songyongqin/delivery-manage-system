import * as React from 'react'
import { Menu, Button, Breadcrumb, Tabs } from 'antd'
import extraConnect from 'domainUtils/extraConnect'
import NetBasic from './components/NetBasic'
import DateRangePicker from 'domainComponents/DateRangePicker'
import { last } from 'utils'
import { getAppConfig } from 'domain/app'
import { get } from 'utils'
import { If, Choose, When, Otherwise } from 'components/ControlStatements'
import { AUDIT_EVENT_NAMESPACE , LAYOUT_NAMESPACE} from 'constants/model'
@extraConnect(
  state => {
    return {
      state,
      initialFilters: state[AUDIT_EVENT_NAMESPACE].initialFilters
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
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      initialFilters: {...this.props.initialFilters, ...this.props.state[LAYOUT_NAMESPACE].timestampRange|| []},
      lastReqTime: 0,
      // activeKey: "net-basic"
      timestampRange: this.props.state[LAYOUT_NAMESPACE].timestampRange|| []
    }
  }
  timestampRangeOnChange = payload => {
    const { initialFilters } = this.props;
    this.props.save({ ...initialFilters, ...payload, page: 1 })
    this.setState({

      // initialFilters: {
      //   ...this.state.initialFilters,
      //   ...payload
      // },
      lastReqTime: new Date().getTime(),
      timestampRange: payload.timestampRange
    })

  }
  render() {
    const { lastReqTime , timestampRange} = this.state;
    const { initialFilters } = this.props;
    return (
      <div style={{ position: "relative" }}>
        <div style={{ float: "right", position: "absolute", right: "0", top: "-45px" }}>
          <DateRangePicker
            value={timestampRange}
            global
            onChange={this.timestampRangeOnChange}>
          </DateRangePicker>
        </div>
        <NetBasic
          key={`${lastReqTime}-tabs`}
          timestampRange = { timestampRange }
          initialFilters={{ ...initialFilters, protocolType: "HTTP" }}>
        </NetBasic>
      </div>
    )
  }
}

export default Page; 
