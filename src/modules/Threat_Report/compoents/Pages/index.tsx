

import React, { Component } from 'react'
import WithAnimateRender from 'components/WithAnimateRender'
import Count from '../Count'
import moment from 'moment'
import Charts from '../Charts'

interface props {
  timestampRange: Array<number>
}



const transform = num => moment(num).format('YYYY-MM-DD')

const getStr = timestampRange => {

  if(!timestampRange.length){
     return '全部'
    }
  else {
    let str = transform(timestampRange[0])
    let str1 = transform(timestampRange[1])
    return `${str} 到 ${str1}`
  }

}

class Pages extends Component<props,any>{
  constructor(props){
    super(props)
    this.state={
      
    }
  }
  

  render(){
    
    const { timestampRange } = this.props
    let str = getStr(timestampRange)
    return(
      <div  >
        <div style={{ textAlign:'center' }} >
          <h2  >威胁报告</h2>
          <div>统计日期：{str}</div>
          
        </div>
        <Count  timestampRange={ timestampRange } 
                key={ timestampRange[0] + timestampRange[1]+'count' } />
        <Charts timestampRange={ timestampRange } 
                key={ timestampRange[0] + timestampRange[1]+'echarts'} />
      </div>
    )
  }
}

export default Pages