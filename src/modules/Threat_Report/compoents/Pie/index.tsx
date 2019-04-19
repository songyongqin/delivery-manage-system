

import React from 'react'
import PieCharts from 'domainComponents/PieCharts/async'
import { Icon } from 'antd'
import transformNum from 'utils/transformNum'
import addComma from 'utils/addComma'
import wrapStr from 'utils/wrapStr'
import dataSetName from 'utils/dataSetName'
const css = require('./index.less')

const Pie = ({ data, title, onClick, total, unit, id, className  }) => {
  const datas = dataSetName(data)
  return(
    <div className={ css.card  } id={ id }  >
      <div className={ css.title } onClick={() => onClick(title) } >
        <Icon type="pie-chart" style={{ fontSize:22, display:'inline-block', marginRight:5 }} />
        <span className={ css.text } >{ title }</span>
        <span style={{ fontSize:15 }} >{' -' + total + ' ' + unit }</span>
      </div>
      <div className={ className } >
      <PieCharts data={ datas }  config={ getConfig(datas) }  />
      </div>
      
    </div>
  )
}

export default Pie

// const LONG = 15

const getNum = (name, data) => {
  let arr = data.filter(i=> i.name===name ) || data
  return arr[0].value
}

// const wrapStr = str => {
//   if(typeof str !=='string'){
//     console.error('输入的数据类型不是字符串，而是：'+ typeof str)
//     return str
//   }
//   else {
//     let isLong = str.length >LONG
//     let strs = isLong ? str.slice(0, LONG) + '...' : str
//     return strs
//   }
// }


const getConfig = data => ({
  title: { },
  tooltip: {
    trigger: 'item',
    // formatter: "{b} :<br /> {c} ({d}%)"
    formatter: params => {
      let num = addComma(params.value)
      let str = `${params.name} :<br />${num} (${params.percent}%)`
      return str
    }
  },
  legend: {
    orient: 'vertical',
    right: 'right',
    bottom: '10',
    height:'90%',
    type:'scroll',
    data: Array.isArray(data) ? data.map(i => i.name) : [],
    formatter: function (name) {
      // return   name +'  ' + transformNum(getNum(name, data))
      return   wrapStr(name, 6) +'  ' + transformNum(getNum(name, data))
  },
    tooltip: {
      show: true
  }
  },

  series: [
    {
      type: 'pie',
      radius: ['0','55%'],
      center: ['25%', '55%'],
      data: Array.isArray(data) ? data.filter(i => i.value) : [],
      minAngle:5,
      label: {
        normal: {
          show: false,
          position: "outside",
          formatter: "{b} : {c} ({d}%)"
        },

      },
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})