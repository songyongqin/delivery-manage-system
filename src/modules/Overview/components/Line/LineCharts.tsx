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
       item['stack'] = '总量'
       item['areaStyle'] = {normal:{}}
       return item
      } )
    return array
  }
  else return []
}

const getDeg = () =>  Math.PI/2

class BarCharts extends React.Component<props, any>{
  constructor(props) {
    super(props)
  }
  render() {
// legend为 series的name
    const { title, xAxis,  series, theme, unit } = this.props

    return <div style={{ width: "100%", height: "260px" }}>
      <ReactEcharts
        style={{ height: "100%" }}
        option={{
          title: {
            text: title,
        },
        graphic: [
          {
                      type: 'text',
                      z: 100,
                      rotation: 1.57,
                      top: 'middle',
                      style: {
                          fill: '#333',
                          text: unit?unit: '流量 /MB',
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
            data:getLegend(series)
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '4%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : xAxis
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : getSeries(series)
        }}>
      </ReactEcharts>
    </div>
  }
}

export default WithCommonProps(BarCharts)