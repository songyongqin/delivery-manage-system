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

const BarCharts = ({ data, title = "", theme = DARK_THEME }) => {

  return <div style={{ width: "100%", height: "360px" }}>
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
            top: '1%',
            left: 500,
            bottom: '1%',
            right: 100,
            width: "300px",
            symbolSize: 7,
            label: {
              normal: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 16,
                color: config[theme].color,
              }
            },

            leaves: {
              label: {
                normal: {
                  position: 'right',
                  verticalAlign: 'middle',
                  align: 'left',
                  fontSize: 16,
                  color: config[theme].color
                }
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

export default WithCommonProps(BarCharts)