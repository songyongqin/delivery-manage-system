import * as React from 'react'
import { Menu, Button, Breadcrumb, Tabs } from 'antd'
import extraConnect from 'domainUtils/extraConnect'
import NetBasic from './components/NetBasic'
import DateRangePicker from 'domainComponents/DateRangePicker'
import { last } from 'utils'
import { getAppConfig } from 'domain/app'
import { get } from 'utils'
import { If, Choose, When, Otherwise } from 'components/ControlStatements'

class Page extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      initialFilters: {
        timestampRange: [],
        page: 1,
        limit: 10,
        threatJudge: [],
        url: "",
        sourceIP: "",
        sourcePort: "",
        requestDomain: "",
        sender: "",
        receiver: "",
        value: ""
      },
      lastReqTime: 0,
      // activeKey: "net-basic"
    }
  }
  timestampRangeOnChange = payload => {
    this.setState({
      initialFilters: {
        ...this.state.initialFilters,
        ...payload
      },
      lastReqTime: new Date().getTime(),
    })

  }
  render() {
    const { initialFilters, lastReqTime } = this.state;

    return (
      <div style={{ position: "relative" }}>
        <div style={{ float: "right", position: "absolute", right: "0", top: "-45px" }}>
          <DateRangePicker
            value={initialFilters.timestampRange}
            onChange={this.timestampRangeOnChange}>
          </DateRangePicker>
        </div>
        <NetBasic
          key={`${lastReqTime}-tabs`}
          initialFilters={{ ...initialFilters, protocolType: "HTTP" }}>
        </NetBasic>
      </div>
    )
  }
}

export default Page; 
