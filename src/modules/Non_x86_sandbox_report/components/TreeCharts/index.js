import ReactEcharts from '../ReactCharts/async'
import * as React from 'react'
import 'echarts/lib/chart/tree'


const BarCharts = ({ data }) => {

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
                color: "rgba(0, 0, 0, 0.65)",
              }
            },

            leaves: {
              label: {
                normal: {
                  position: 'right',
                  verticalAlign: 'middle',
                  align: 'left',
                  fontSize: 16,
                  color: "rgba(0, 0, 0, 0.65)",
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

export default BarCharts