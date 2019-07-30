

import React from 'react'
import PieChart from 'domainComponents/PieCharts/async'
import wrapStr from 'utils/wrapStr'
import dataSetName from 'utils/dataSetName'
import getPieBottom from 'utils/getPieBottom';
const styles = require('./index.less')

const Wrap = props =>{
  return (
    <div style={ { width:'100%'  } } className={ styles.container } >{ props.children }</div>
  )
}

const getConfig = data => {
  let obj = {}
  const bottom = getPieBottom(data)
  obj['legend'] = {
    orient: 'vertical',
    right: 'right',
    bottom: bottom,
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
      center: ['35%', '55%'],
      // avoidLabelOverlap: true,
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

const Pie = ({ data, title,  }) => {
  const datas = dataSetName(data)
  return (
    <Wrap>
      <PieChart data={ datas } titles={ { text:title } }  config={ getConfig(datas) } />
    </Wrap>
  )
}

export default Pie