import ReactEcharts from 'components/ReactCharts/async'
import { connect } from 'dva'
import * as React from 'react'
import { DARK_THEME, LIGHT_THEME } from 'configs/ConstConfig'
import WithCommonProps from 'domainComponents/WithCommonProps'
import 'echarts/lib/chart/line'

const config = {
  [DARK_THEME]: {
    color: "#A3B2C1"
  },
  [LIGHT_THEME]: {
    color: "rgba(0, 0, 0, 0.65)"
  }
}

class BarCharts extends React.Component<any, any>{
  constructor(props) {
    super(props)
  }
  render() {

    const { data, xData, theme } = this.props

    return <div style={{ width: "100%", height: "260px" }}>
      <ReactEcharts
        style={{ height: "100%" }}
        option={{
          color: ["#73d13d", "#f5222d", "#1890ff"],
          grid: {
            left: '20px',
            right: '20px',
            bottom: '5px',
            top: '5px',
            containLabel: true
          },
          xAxis: {
            type: 'time',
            axisLabel: {
              // show: false
              textStyle: config[theme]
            }
            // boundaryGap: false,
            // axisLabel: {
            //   interval: 0,
            //   rotate: 30,
            //   textStyle: ""
            // },
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              textStyle: config[theme]
            },
          },
          series: data.map(i => {
            return {
              text: i.name,
              data: i.value,
              type: "line",
              smooth: true,
              // symbol: false,
              showSymbol: false
            }
          })
        }}>
      </ReactEcharts>
    </div>
  }
}

export default WithCommonProps(BarCharts)