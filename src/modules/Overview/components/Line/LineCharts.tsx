import ReactEcharts from 'components/ReactCharts/async'
import { connect } from 'dva'
import * as React from 'react'
// import { DARK_THEME, LIGHT_THEME } from 'configs/ConstConfig'
import WithCommonProps from 'domainComponents/WithCommonProps'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/graphic'

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

interface props{
  theme?: string
  title: string
  xAxis: Array<string>
  series: seriesItem
  unit: string
}

interface seriesItem{
  name: string
  data: Array<number>
}

const getLegend = arr => {
  if(Array.isArray(arr)&&arr.length){
    let array = arr.map(item => item.name )
    return array
  }
  else return []
}

const getSeries = arr => {
  if(Array.isArray(arr)&&arr.length){
    let array = arr.map(item =>{
       item['type'] = 'line'
       item['smooth']= true;
      //  item['stack'] = '总量'
      //  item['areaStyle'] = {normal:{}}
       return item
      } )
    return array
  }
  else return []
}

const getDeg = () =>  Math.PI/2

const color = ['#89A6FF','#7371E8', '#A27CFF', '#71AEE8', '#7DE1FF','#6BE8C5', '#FFDD68', '#F8CEB3']

class BarCharts extends React.Component<props, any>{
  constructor(props) {
    super(props)
  }
  render() {
// legend为 series的name
    const { title, xAxis,  series, theme, unit } = this.props

    return <div style={{ width: "100%", height: "100%" }}>
      <ReactEcharts
        style={{  width: "100%", height: "100%" }}
        option={{
          title: {
            text: title,
            padding: 15,
            target:'self',
            textStyle: {fontFamily: "Arial", fontSize: 14 }
        },
        graphic: [
          {
                      type: 'text',
                      z: 100,
                      rotation: 1.57,
                      top: 'middle',
                      style: {
                          fill: '#333',
                          text: unit?unit: '流量 /GB',
                          font: '14px Microsoft YaHei',
                      }
                  },
         
      ],
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            top:'12%',
            data:getLegend(series),
            type:'scroll',
        },
        // toolbox: {
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },
        grid: {
            left: '4%',
            right: '4%',
            bottom: '3%',
            top:'27%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : xAxis,
                // axisLabel:{
                //   rotate:45  
                // },
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : getSeries(series),
        color
        }}>
      </ReactEcharts>
    </div>
  }
}

export default WithCommonProps(BarCharts)