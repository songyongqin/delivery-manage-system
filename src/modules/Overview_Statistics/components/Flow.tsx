import ReactEcharts from 'components/ReactCharts/async'
import * as React from 'react'
import WithCommonProps from 'domainComponents/WithCommonProps'
import { DARK_THEME, LIGHT_THEME } from 'constants/theme'
import 'echarts/lib/chart/bar'
import extraConnect from 'domainUtils/extraConnect'
import { OVERVIEW_STATISTICS_FLOW_NAMESPACE } from 'constants/model'
import Spin from 'domainComponents/Spin'
import { Choose, When, Otherwise } from 'components/ControlStatements'

@WithCommonProps
class FlowBarCharts extends React.Component<any, any>{
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


    const itemStyleList = [
      {
        normal: {
          borderColor: "#1890ff",
          borderWidth: 2,
          color: "rgba(46,136,252,0.6)"
        }
      },
      {
        normal: {
          borderColor: "rgba(245,34,45,1)",
          borderWidth: 2,
          color: "rgba(245,34,45,0.6)"
        }
      }
    ]

    return (
      <div key="content-panel">
        {
          data.map((i, index) => {

            const xData = i.data.map(i => i.name);
            const yData = i.data.map(i => i.value);
            return (
              <div key={`${index}-bar-chart`}
                style={{ marginBottom: "50px", height: "600px" }}>
                <ReactEcharts
                  style={{ height: "100%" }}
                  option={{
                    title: {
                      text: i.title,
                      x: 'center',
                      // textStyle: titleStyle
                      show: true
                    },
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
                    yAxis: [
                      {
                        type: 'category',
                        data: xData,
                        axisTick: {
                          alignWithLabel: true
                        },
                        axisLabel: {
                          interval: 0,
                          textStyle: textStyle
                        },

                      }
                    ],
                    xAxis: [
                      {
                        name: i.xTitle,
                        nameTextStyle: textStyle,
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
                        itemStyle: itemStyleList[index % itemStyleList.length],
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


const mapStateToProps = state => {
  return {
    loading: state.loading.effects[`${OVERVIEW_STATISTICS_FLOW_NAMESPACE}/fetch`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetch: payload => dispatch({
      type: `${OVERVIEW_STATISTICS_FLOW_NAMESPACE}/fetch`,
      payload
    })
  }
}

@extraConnect(mapStateToProps, mapDispatchToProps)
export default class extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.fetchData(this.props.initialFilters)
  }
  fetchData = (filters) => {
    this.props.fetch(filters).then(res => {
      this.setState({
        data: res
      })
    })
  }
  render() {

    const { data } = this.state

    return <div>
      <h4>主要协议排行</h4>
      <Choose>
        <When condition={this.props.loading}>
          <Spin spinning={true}>
            <div style={{ height: "480px" }}></div>
          </Spin>
        </When>
        <Otherwise>
          <FlowBarCharts data={data} ></FlowBarCharts>
        </Otherwise>
      </Choose>
    </div>
  }
}

