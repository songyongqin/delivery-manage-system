

import React from 'react'
import PieChart from 'domainComponents/PieCharts/async'
import wrapStr from 'utils/wrapStr'
import dataSetName from 'utils/dataSetName'

const Wrap = props =>{
  return (
    <div style={ { width:400, display:'inline-block', border:'1px solid rgba(0,0,0,0.3)', borderRadius:10, margin:10  } } >{ props.children }</div>
  )
}

const getConfig = data => {
  let obj = {}

  obj['legend'] = {
    orient: 'vertical',
    right: 'right',
    bottom: '10',
    height:'90%',
    type:'scroll',
    data: Array.isArray(data) ? data.map(i => i.name) : [],
    formatter: function (name) {
      return   wrapStr(name)
    },
    tooltip: {
      show: true
    }
  }

  obj['series'] = [
    {
      // name:'访问来源',
      type:'pie',
      // selectedMode: 'single',
      radius: [0, '60%'],
      center: ['35%', '50%'],
      minAngle:5,
      label: {
        normal: {
          show: false,
          position: "outside",
          formatter: "{b} : {c} ({d}%)"
        },

      },
      data:Array.isArray(data) ? data.filter(i => i.value) : [],
  }
  ]
  return obj
}

const Pie = ({ data, title }) => {
  const datas = dataSetName(data)
  return (
    <Wrap>
      <PieChart data={ datas } titles={ { text:title } }  config={ getConfig(datas) } />
    </Wrap>
  )
}

export default Pie