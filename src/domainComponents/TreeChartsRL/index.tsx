import ReactEcharts from 'components/ReactCharts/async'
import { connect } from 'dva'
import * as React from 'react'
import { LIGHT_THEME, DARK_THEME } from 'constants/theme'
import WithCommonProps from 'domainComponents/WithCommonProps'
import 'echarts/lib/chart/tree'

const config = {
  [DARK_THEME]: {
    color: "#A3B2C1"
  },
  [LIGHT_THEME]: {
    color: "rgba(0, 0, 0, 0.65)"
  }
}

const BarChartsRL = ({ data, title = "", theme = DARK_THEME }) => {

  return <div style={{ width: "100%", height: "250px" }}>
    <ReactEcharts
      style={{ height: "100%", width: "100%" }}
      option={{
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        geo: {
          roam: true,
        },
        series: [
          {
            type: 'tree',

            data: data,
            layout: 'orthogonal',
            top: '1%',
            left: '15%',
            bottom: '1%',
            right: '7%',

            symbolSize: 7,

            orient: 'RL',

            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left'
            },

            leaves: {
              label: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right'
              }
            },

            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      }}>
    </ReactEcharts>
  </div>

}

export default WithCommonProps(BarChartsRL)