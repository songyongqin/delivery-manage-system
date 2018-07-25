

import React, { Component } from 'react'
import WithAnimateRender from 'components/WithAnimateRender'

interface props {
  timeRange: string
}

class Pages extends Component<props,any>{
  constructor(props){
    super(props)
    this.state={
      
    }
  }
  

  render(){
    
    const { timeRange } = this.props
    return(
      <div  >
        <div style={{ textAlign:'center' }} >
          <h2  >威胁报告</h2>
          <div>统计日期：{timeRange}</div>
        </div>
      </div>
    )
  }
}

export default Pages