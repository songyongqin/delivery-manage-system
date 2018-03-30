import * as React from 'react'
import Card from 'domainComponents/Card'
import Event from './components/Event'
import Flow from './components/Flow'
import DateRangePicker from 'domainComponents/DateRangePicker'

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

    return (
      <Card title={<div
        style={{ overflow: "hidden" }}>
        <span style={{ float: "left" }}>
          统计数据
        </span>
        <div style={{ float: "right" }}>
          <DateRangePicker
            onChange={this.onChange}
            defaultValue={this.state.filters}>
          </DateRangePicker>
        </div>
      </div>}>
        <Event key={`${lastReqTime}-event`} initialFilters={filters}></Event>
        <Flow key={`${lastReqTime}-flow`} initialFilters={filters}></Flow>
      </Card>
    )
  }
}