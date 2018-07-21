import * as React from 'react'

import WithAnimateRender from 'components/WithAnimateRender'
import { ANALYSE_EVENT_VIEW } from 'constants/model'
import DateRangePicker from 'domainComponents/DateRangePicker'

// import {

// } from './constants'




@WithAnimateRender
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      lastChangeTime: 0,
      filters: {
        timestampRange: []
      }
    }
  }

  timestampRangeOnChange = filters => {
    this.setState({
      filters,
      lastChangeTime: new Date().getTime()
    })
  }

  render() {

    const {  filters } = this.state

    return (
      <div style={{ position: "relative" }}>
        <div style={{ float: "right", position: "absolute", right: "0", top: "-45px" }}>
          <DateRangePicker
            value={filters.timestampRange}
            onChange={this.timestampRangeOnChange}>
          </DateRangePicker>
        </div>
        {
          this.props.animateRender([
            <div key="event-statistics">
            </div>
          ])
        }
      </div>
    )
  }
}

export default Page