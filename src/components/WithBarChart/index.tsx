import ReactEcharts from 'components/ReactCharts/async'
import { connect } from 'dva'
import * as React from 'react'
// import { DARK_THEME, LIGHT_THEME } from 'configs/ConstConfig'
import WithCommonProps from 'domainComponents/WithCommonProps'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'

const DARK_THEME = 'dark'
const LIGHT_THEME = 'light'

const config = {
  [DARK_THEME]: {
    color: "#A3B2C1"
  },
  [LIGHT_THEME]: {
    color: "rgba(0, 0, 0, 0.65)"
  }
}

let getOption = ({ data ,theme, titles }) =>  ({
  color: ['#4F5DCA'],
  tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
  },
  grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top:'10%',
      containLabel: true
  },
  xAxis : [
      {
          type : 'category',
          // data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: data.length ?  data.map(i => i.name) : [],
          axisTick: {
              alignWithLabel: true
          },
          axisLabel:{
            rotate:45  
          },
      }
  ],
  yAxis : [
      {
          type : 'value'
      }
  ],
  series : [
      {
          // name:'直接访问',
          type:'bar',
          barWidth: 20,
          // data:[10, 52, 200, 334, 390, 330, 220],
          data: data.length ?  data.map(i =>  i.value ): [] ,
          label: {
            normal: {
                show: true,
                // position: 'top'
                position: 'inside',
                offset: [0, -5],
                rotate: 90
            }
        },
      }
  ]
})


const WithBarChart = ({ data, theme=LIGHT_THEME, titles={}, config={}, onEvents }) => {
  let option = { ...getOption({data, theme, titles}), ...config }
  // console.log('option', option)
  if(Array.isArray(data) ){
    if(onEvents){
      return (
        // <div style={{ width: "100%", height: "400px" }}>
        <div style={{ width: "100%", height: "100%"}}>
          <ReactEcharts
            style={{ height: "100%" }}
            option={ option }
            onEvents={onEvents}>
          </ReactEcharts>
        </div>
      )
    }
    else {
      return (
        // <div style={{ width: "100%", height: "400px" }}>
        <div style={{ width: "100%", height:"100%" }}>
          <ReactEcharts
            style={{ height: "100%" }}
            option={ option }>
          </ReactEcharts>
        </div>
      )
    }
  }
  return <div style={{ width: "100%", height: "400px" }}></div>

}


export default WithCommonProps(WithBarChart)