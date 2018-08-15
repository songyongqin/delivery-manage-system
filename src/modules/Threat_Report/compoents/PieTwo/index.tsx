

import React from 'react'
import PieCharts from 'domainComponents/PieCharts/async'
import { Icon } from 'antd'
import transformNum from 'utils/transformNum'
import addComma from 'utils/addComma'
const css = require('./index.less')

const PieTwo = ({ data, data2, title, onClick, total, unit  }) => {
  if(data.length){
    data[0]['selected'] = true
  }
  return(
    <div className={ css.card } >
      <div className={ css.title } onClick={() => onClick(title) } >
        <Icon type="pie-chart" style={{ fontSize:22, display:'inline-block', marginRight:5 }} />
        { title}
        <span style={{ fontSize:15 }} >{' -' + total + ' ' + unit }</span>
      </div>
      <PieCharts data={ data }  config={ getConfig(data, data2) }  />
    </div>
  )
}

export default PieTwo

const LONG = 15

const getNum = (name, data) => {
  let arr = data.filter(i=> i.name===name ) || data
  return arr[0].value
}

const wrapStr = str => {
  if(typeof str !=='string'){
    console.error('输入的数据类型不是字符串，而是：'+ typeof str)
    return str
  }
  else {
    let isLong = str.length >LONG
    let strs = isLong ? str.slice(0, LONG) + '...' : str
    return strs
  }
}


const getConfig = (data, data2) => ({
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
    data: Array.isArray(data2) ? data2.map(i => i.name) : [],
    formatter: function (name) {
      // return   name +'  ' + transformNum(getNum(name, data))
      return   wrapStr(name) +'  ' + transformNum(getNum(name, data2))
  },
    tooltip: {
      show: true
  }
  },

  series: [
    {
      type: 'pie',
      radius: [0,'30%'],
      center: ['40%', '40%'],
      selectedMode: 'single',
      // data: data => {
      //   let str = JSON.stringify(data)
      //   let arr = JSON.parse(str)
      //   arr[0]['selected'] = true
      //   console.log(arr)
      //   return arr
      // },
      data: Array.isArray(data) ? data.filter(i => i.value).map((item => {
        item.selected = false
        return item
      } )) : [],
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
    },
    {
      type: 'pie',
      radius: ['40%','60%'],
      center: ['40%', '40%'],
      data: data2,
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
    },
  ]
})