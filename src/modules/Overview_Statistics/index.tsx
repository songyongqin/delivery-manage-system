import * as React from 'react'
import Card from 'domainComponents/Card'
import Event from './components/Event'
import Flow from './components/Flow'
import DateRangePicker from 'domainComponents/DateRangePicker'
import { getAppConfig } from 'domain/app'
import { get } from 'utils'
import { If } from 'components/ControlStatements'

const initialFilters = {
  timestampRange: []
}

export default class extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      filters: initialFilters,
      lastReqTime: 0
    }
  }
  onChange = filters => {
    this.setState({
      filters,
      lastReqTime: new Date().getTime()
    })
  }
  render() {

    const { lastReqTime, filters } = this.state

    const overviewConfig = get(getAppConfig(), ["overview"], {})

    return (
      <Card title={<div
        style={{ overflow: "hidden" }}>
        <span style={{ float: "left" }}>
          统计数据
        </span>
        <div style={{ float: "right" }}>
          <DateRangePicker
            onChange={this.onChange}
            value={this.state.filters.timestampRange}>
          </DateRangePicker>
        </div>
      </div>}>
        <If condition={overviewConfig["threatEvent"]}>
          <Event initialFilters={filters}></Event>
        </If>
        <If condition={overviewConfig["captureFlow"]}>
          <Flow initialFilters={filters}></Flow>
        </If>
      </Card>
    )
  }
}