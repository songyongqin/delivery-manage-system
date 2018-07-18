

import React from 'react'
import PieChart from 'domainComponents/PieCharts/async'


const Wrap = props =>{
  return (
    <div style={ { width:400, display:'inline-block' } } >{ props.children }</div>
  )
}

const getConfig = data => {
  let obj = {}
  data[0]['selected'] = true
  obj['series'] = [
    {
      // name:'访问来源',
      type:'pie',
      selectedMode: 'single',
      radius: [0, '60%'],
      center: ['35%', '50%'],
      label: {
          normal: {
              position: 'inner'
          }
      },
      labelLine: {
          normal: {
              show: false
          }
      },
      data:data
  }
  ]
  return obj
}

const Pie = ({ data, title }) => {
  
  return (
    <Wrap>
      <PieChart data={ data } titles={ { text:title } }  config={ getConfig(data) } />
    </Wrap>
  )
}

export default Pie