import ReactEcharts from 'components/ReactCharts/async'
import * as React from 'react'
import WithCommonProps from 'domainComponents/WithCommonProps'
import { DARK_THEME, LIGHT_THEME } from 'constants/theme'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'

@WithCommonProps
export default class RankingBarCharts extends React.Component<any, any>{
  render() {
    const { theme, data } = this.props
    const textStyle = theme === DARK_THEME
      ?
      {
        color: "rgb(183,193,204)"
      }
      :
      {
        color: "rgba(0, 0, 0, 0.85)"
      }

    const titleStyle = theme === DARK_THEME
      ?
      {
        color: "white"
      }
      :
      {
        color: "black"
      }

    return (
      <div key="content-panel">
        {
          data.map((i, index) => {

            const xData = i.data.map(i => i.name);
            const yData = i.data.map(i => i.value);

            return (
              <div key={`${index}-bar-chart`}
                style={{ marginBottom: "50px", height: "480px" }}>
                <ReactEcharts
                  style={{ height: "100%" }}
                  option={{
                    title: {
                      text: i.title,
                      x: 'center',
                      textStyle: titleStyle
                    },
                    color: ['#108ee9'],
                    tooltip: {
                      trigger: 'axis',
                      axisPointer: {
                        type: 'shadow'
                      }
                    },
                    grid: {
                      left: '3%',
                      right: '15%',
                      bottom: '50px',
                      containLabel: true
                    },
                    xAxis: [
                      {
                        name: i.xTitle,
                        nameTextStyle: textStyle,
                        type: 'category',
                        data: xData,
                        axisTick: {
                          alignWithLabel: true
                        },
                        axisLabel: {
                          interval: 0,
                          rotate: 30,
                          textStyle: textStyle
                        },

                      }
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        axisLabel: {
                          textStyle: textStyle
                        },
                      }
                    ],
                    series: [
                      {
                        type: 'bar',
                        barWidth: '22px',
                        data: yData,
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
            )
          })
        }
      </div>
    )
  }
} 