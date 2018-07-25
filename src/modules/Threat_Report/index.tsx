

import React, { Component } from 'react'
import WithAnimateRender from 'components/WithAnimateRender'
import DateRangePicker from 'domainComponents/DateRangePicker'
import { Button ,Tag, Input } from 'antd'
import { getTodayTime } from 'utils/getInitTime'
import Pages from './compoents/Pages'

class ThreatReport extends Component<any,any>{
  constructor(props){
    super(props)
    this.state={
      timestampRange:getTodayTime()||[],
      countKey:0
    }
  }
  timestampRangeOnChange = filters => {
    let timestampRange = filters.timestampRange
    this.setState({  countKey: +new Date() , timestampRange })
  }

  render(){
    const { timestampRange } = this.state
    console.log(this.state)
    return(
      <div style={{ position: "relative" }} >
        <div style={{ float: "right", position:'absolute', right:10 }}>
          <DateRangePicker
            value={timestampRange}
            onChange={this.timestampRangeOnChange}>
          </DateRangePicker>
          <Button type={ 'primary' } style={{ marginLeft: 20 }}  >导出</Button>
        </div>
        <Pages timeRange={ '2018-7-21 到 2018-7-24' } />
      </div>
    )
  }
}


export default ThreatReport