import ReactEcharts from 'components/ReactCharts/async'
import { connect } from 'dva'
import * as React from 'react'
// import { DARK_THEME, LIGHT_THEME } from 'configs/ConstConfig'
import WithCommonProps from 'domainComponents/WithCommonProps'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legendScroll'
import wrapStr from 'utils/wrapStr'
import addComma from 'utils/addComma'
import dataSetName from 'utils/dataSetName'
import mergeWith from 'lodash/mergeWith'

const DARK_THEME = 'dark'
const LIGHT_THEME = 'light'

const config = {
  [DARK_THEME]: {
    color: "#A3B2C1",
    fontFamily: "Arial"
  },
  [LIGHT_THEME]: {
    // color: "rgba(0, 0, 0, 0.65)",
    fontFamily: "Arial",
    rich: {
      a:{
        // color: 'red',
        // backgroundColor: '#449933',
        
      }
    },
    widht:50,
  }
}

let getOption = ({ data ,theme, titles }) =>  ({
  title: {
    text: titles.text ||'',
    x: 'center',
    link: titles.link,
    padding: 15,
    target:'self',
    textStyle: {...config[theme], fontSize: 14 }
  },
  tooltip: {
    trigger: 'item',
    // formatter: "{b} : {c} ({d}%)"
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
    height:'75%',
    width:50,
    itemWidth: 5,
    itemHeight:5,
    type:'scroll',
    data: Array.isArray(data) ? data.map(i => i.name) : [],
    textStyle: config[theme],
    formatter: function (name) {
      return   `{a|${wrapStr(name, 10)}}`
    },
  //   formatter: [
  //     '{a|这段文本采用样式a}',
  //     '{a|这段文本采用样式a}'
  // ].join(''),
    tooltip: {
      show: true
    }
  },
  // color: [
  //   // "#516b91",
  //   // "#59c4e6",
  //   // "#edafda",
  //   // "#93b7e3",
  //   // "#a5e7f0",
  //   // "#cbb0e3",
  //   // "#3fb1e3",
  //   // "#6be6c1",
  //   // "#626c91",
  //   // "#a0a7e6",
  //   // "#c4ebad",
  //   // "#96dee8"
  // ],
  series: [
    {
      type: 'pie',
      radius: ['35%','45%'],
      center: ['25%', '60%'],
      data: Array.isArray(data) ? data.filter(i => i.value) : [],
      minAngle:5,
      label: {
        normal: {
          show: false,
          position: "center"
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

const color = ['#89A6FF','#7371E8', '#A27CFF', '#71AEE8', '#7DE1FF','#CCCCCC']


const PieCharts = ({ data, theme=LIGHT_THEME, titles={}, config={}, onEvents }) => {
  const datas = dataSetName(data)
  // let option = { ...getOption({data:datas, theme, titles}), ...config, color }
  let option = { ...mergeWith(getOption({data:datas, theme, titles}), config), color }
  if(Array.isArray(data) ){
    if(onEvents){
      return (
        // <div style={{ width: "100%", height: "400px" }}>
        <div style={{ width: "100%", height: "100%" }}>
          <ReactEcharts
            style={{width: "100%", height: "100%"  }}
            option={ option }
            onEvents={onEvents}>
          </ReactEcharts>
        </div>
      )
    }
    else {
      return (
        // <div style={{ width: "100%", height: "400px" }}>
        <div style={{width: "100%", height: "100%"  }}>
          <ReactEcharts
            style={{width: "100%", height: "100%"  }}
            option={ option }>
          </ReactEcharts>
        </div>
      )
    }
  }
  return <div style={{ width: "100%", height: "300px" }}></div>

}

// class PieCharts extends React.Component<any,any>{
//   constructor(props){
//     super(props)
//     this.state = {
//     }
//   }
  
//   render(){
//     const { data, theme, titles, config } = this.props
//     let option = { ...getOption({data, theme, titles}), ...config }
//     console.log('option', option, this.props)
//     return (
//     <div style={{ width: "100%", height: "400px" }}   >
//       {
//         option ? 
//         <ReactEcharts
//         style={{ height: "100%" }}
//         option={ option }>
//       </ReactEcharts>
//       : <div></div>
//       }
//     </div>
//     )
//   }
// } 

export default WithCommonProps(PieCharts)