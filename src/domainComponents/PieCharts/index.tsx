import ReactEcharts from 'components/ReactCharts/async'
import { connect } from 'dva'
import * as React from 'react'
import { DARK_THEME, LIGHT_THEME } from 'configs/ConstConfig'
import WithCommonProps from 'domainComponents/WithCommonProps'
import 'echarts/lib/chart/pie'
const config = {
  [DARK_THEME]: {
    color: "#A3B2C1"
  },
  [LIGHT_THEME]: {
    color: "rgba(0, 0, 0, 0.65)"
  }
}

const BarCharts = ({ data = [], title = "", theme = DARK_THEME }) => {

  return <div style={{ width: "100%", height: "400px" }}>
    <ReactEcharts
      style={{ height: "100%" }}
      option={{
        title: {
          text: title,
          x: 'center',
          textStyle: config[theme]
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)"
        },
        grid: {
          left: '100px',
          top: "0px",
          right: '0px',
          bottom: '0px',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: data.map(i => i.name),
          textStyle: config[theme]
        },
        color: [
          // "#516b91",
          // "#59c4e6",
          // "#edafda",
          // "#93b7e3",
          // "#a5e7f0",
          // "#cbb0e3"
          "#3fb1e3",
          "#6be6c1",
          "#626c91",
          "#a0a7e6",
          "#c4ebad",
          "#96dee8"
        ],
        series: [
          {
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            data: data,
            label: {
              normal: {
                show: true,
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
      }}>
    </ReactEcharts>
  </div>

}

export default WithCommonProps(BarCharts)