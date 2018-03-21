import React from 'react'
import classnames from 'classnames'
import { Menu, Button, Breadcrumb, Table, Icon, Row, Col, Card, Badge, Modal } from 'antd'
import WithAnimateRender from 'components/WithAnimateRender'
import { connect } from 'dva'
import LastEvent from 'modules/LastEvent'
import EventStatistics from 'modules/EventStatistics'
import DateRangePicker from 'domainComponents/DateRangePicker'

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

    const { visible, activeKey, lastChangeTime, filters } = this.state

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
              <h3>威胁事件类型</h3>
              <EventStatistics
                key={`event-statistics-${lastChangeTime}`}
                initialFilters={filters}
                isDark={false}>
              </EventStatistics>
            </div>,
            <div key="last-event">
              <h3>最近紧急事件</h3>
              <LastEvent
                initialFilters={filters}
                key={`last-event-${lastChangeTime}`}>
              </LastEvent>
            </div>
          ])
        }
      </div>
    )
  }
}

export default Page