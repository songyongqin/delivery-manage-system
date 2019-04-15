import ReactEcharts from 'components/ReactCharts/async'
import { connect } from 'dva'
import * as React from 'react'
import { DARK_THEME, LIGHT_THEME } from 'configs/ConstConfig'
import WithCommonProps from 'domainComponents/WithCommonProps'
import 'echarts/lib/chart/bar'

const config = {
  [DARK_THEME]: {
    color: "#A3B2C1"
  },
  [LIGHT_THEME]: {
    color: "rgba(0, 0, 0, 0.65)"
  }
}

const BarCharts = ({ data, title = "", theme = DARK_THEME }) => {
  return <div style={{ width: "100%", height: "360px" }}>
    <ReactEcharts
      style={{ height: "100%" }}
      option={{
        title: {
          text: title,
          x: 'center',
          textStyle: config[theme]
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '15px',
          right: '15px',
          bottom: '10px',
          containLabel: true,
          borderWidth: 0,
        },
        xAxis: [
          {
            // name: i.xTitle,
            type: 'category',
            data: data.map(i => i.name),
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              rotate: 30,
              textStyle: config[theme]
            },

          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              textStyle: config[theme]
            },
          }
        ],
        series: [
          {
            type: 'bar',
            barWidth: '60%',
            data: data.map(i => i.value),
            itemStyle: {
              normal: {
                borderColor: "#4F5DCA",
                borderWidth: 2,
                color: "rgba(46,136,252,0.6)"
              }
            },
            label: {
              normal: {
                position: 'top',
                show: true
              }
            },
          }
        ]
      }}>
    </ReactEcharts>
  </div>

}

export default WithCommonProps(BarCharts)