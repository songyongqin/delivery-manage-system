

import React from 'react'
import PieChart from 'domainComponents/PieCharts/async'
import wrapStr from 'utils/wrapStr'


const Wrap = props =>{
  return (
    <div style={ { width:400, display:'inline-block' } } >{ props.children }</div>
  )
}

const getConfig = data => {
  let obj = {}
  // let arr = data.slice(0)
  // if(arr&&arr.length){
  //   arr[0]['selected'] = true
  // }
  obj['legend'] = {
    orient: 'vertical',
    right: 'right',
    bottom: '10',
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
      
      data: Array.isArray(data) ? data.filter(i => i.value) : [],
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