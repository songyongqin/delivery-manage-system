

import React from 'react'
import PieChart from 'domainComponents/PieCharts/async'
import wrapStr from 'utils/wrapStr'
import dataSetName from 'utils/dataSetName'
import getPieBottom from 'utils/getPieBottom';
const styles = require('./index.less')

const Wrap = props =>{
  return (
    <div className={ styles.container }  style={ { width:'100%', height:'100%',  display:'inline-block'} } >
      { props.children }
    </div>
  )
}

const getConfig = data => {
  let obj = {}
  // let arr = data.slice(0)
  // if(arr&&arr.length){
  //   arr[0]['selected'] = true
  // }

  const bottom = getPieBottom(data)
  obj['legend'] = {
    orient: 'vertical',
    right: 'right',
    bottom: bottom,
    height:'80%',
    type:'scroll',
    data: Array.isArray(data) ? data.map(i => i.name) : [],
    formatter: function (name) {
      return   wrapStr(name, 10)
    },
    tooltip: {
      show: true
    }
  }
  obj['series'] = [
    {
      // name:'访问来源',
      type:'pie',
      selectedMode: 'single',
      radius: ['0','45%'],
      center: ['25%', '55%'],
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

const Pie = ({ data, title, onEvents={} }) => {
  const datas = dataSetName(data)
  return (
    <Wrap>
      <PieChart data={ datas } titles={ { text:title } }  config={ getConfig(datas) } onEvents={ onEvents } />
    </Wrap>
  )
}

export default Pie