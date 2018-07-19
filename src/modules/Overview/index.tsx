import React from 'react'
// import classnames from 'classnames'
// import { Menu, Button, Breadcrumb, Table, Icon, Row, Col, Card, Badge, Modal } from 'antd'
import WithAnimateRender from 'components/WithAnimateRender'
// import { connect } from 'dva'
// import LastEvent from 'modules/LastEvent'
// import EventStatistics from 'modules/EventStatistics'
import DateRangePicker from 'domainComponents/DateRangePicker'
import Pie from './components/Pie'
// import OverviewStatistics from 'modules/Overview_Statistics'

import { OVERVIEW_STATISTICS_COUNT } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import { Input } from 'antd'


const MapStateToProps = state => {
  return{
    loading: state.loading.effects[`${OVERVIEW_STATISTICS_COUNT}/fetchCount`]
  }
}

const MapDispatchToProps = dispatch => {
  return {
    fetchCount: payload => dispatch({
      type: `${OVERVIEW_STATISTICS_COUNT}/fetchCount`,
      payload
    }),
    fetchFlow: payload => dispatch({ 
      type: `${OVERVIEW_STATISTICS_COUNT}/fetchFlow`,
      payload
     })
  }
}

@WithAnimateRender
@extraConnect(MapStateToProps, MapDispatchToProps )
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      lastChangeTime: 0,
      count: {
        familyCount: [],
      },
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
  componentDidMount(){

    this.getCount();
    this.getFlow() 

  }

  getCount = () => {
    this.props.fetchCount()
    .then(res => {
      this.setState({ count: res })
    } )
    .catch( err => console.error(err)  )
  }

  getFlow = () => {

    this.props.fetchFlow()
    .then(res => {
      this.setState({ flow: res })
      console.log(res)
    } )
    .catch( err => console.error(err)  )
  }

  getValue = e => {
    let value = e.target.value ? e.target.value : ''
    console.log(value.toString())
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
            // <div key="event-statistics">
            //   <h3>威胁事件类型</h3>
            //   <EventStatistics
            //     key={`event-statistics-${lastChangeTime}`}
            //     initialFilters={filters}
            //     isDark={false}>
            //   </EventStatistics>
            // </div>,
            // <div key="last-event">
            //   <h3>最近紧急事件</h3>
            //   <LastEvent
            //     initialFilters={filters}
            //     key={`last-event-${lastChangeTime}`}>
            //   </LastEvent>
            // </div>,
            // <div key="overview-statistics" style={{ marginTop: "15px" }}>
            //   <OverviewStatistics ></OverviewStatistics>
            // </div>
            <div key='pie-charts' >
              <Pie data={ this.state.count } />
            </div>
          ])
        }
      </div>
    )
  }
}

export default Page