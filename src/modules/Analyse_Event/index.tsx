import * as React from 'react'
import classnames from 'classnames'
import { Menu, Button, Breadcrumb, Table, Icon, Row, Col, Card, Badge, Modal } from 'antd'
import WithAnimateRender from 'components/WithAnimateRender'
import { connect } from 'dva'
import EventStatistics from 'modules/EventStatistics'
import DateRangePicker from 'domainComponents/DateRangePicker'

import * as tableConfig from './components/TableConfig'
import {
  statisticDataIndexes,
  // statisticsTextConfig,
  tableTextConfig,
  haveDetailsDataIndexes,
  FALLHOST_DATAINDEX,
  NAMESPACE,
  EVENT_ACTION_DATA_INDEX,
  MAIN_NAMESPACE,
  ACTION_DATAINDEX,
  STATISTICS_NAMESPACE
} from './constants'

import EventPanel from './components/EventPanel'



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
            <div key="event-panel">
              <h3>威胁事件分析</h3>
              <EventPanel
                initialFilters={filters}
                key={`last-event-${lastChangeTime}`}>
              </EventPanel>
            </div>
          ])
        }
      </div>
    )
  }
}

export default Page