import ReactEcharts from 'components/ReactCharts/async'
import * as React from 'react'
import WithCommonProps from 'domainComponents/WithCommonProps'
import { DARK_THEME, LIGHT_THEME } from 'constants/theme'
import echarts from 'echarts'
import worldMap from 'echarts/map/json/world.json'
import chinaMap from 'echarts/map/json/china.json'
import 'echarts/lib/component/geo.js'
echarts.registerMap("world", worldMap)
echarts.registerMap("china", chinaMap)

const getOption = ({ data, theme, mapType = "world" }) => {
  const values = data.map(i => i.value)

  const textStyle = theme === DARK_THEME
    ?
    {
      color: "white"
    }
    :
    {
      color: "rgba(0,0,0,0.85)"
    }

  const option: any = {
    tooltip: {
      trigger: 'item',
      formatter: function (params) {

        const { name } = params;
        const itemData = data.filter(i => i.name === name)
        if (itemData.length === 0) {
          return;
        }
        return "威胁分布" + '<br/>' + itemData[0].title + ' : ' + (params.value || 0) + "(攻击次数)";
      }
    },
    grid: {
      left: '0',
      right: '0',
      bottom: '0',
      containLabel: true
    },
    series: [
      {
        name: '',
        type: 'map',
        map: mapType,
        roam: true,
        itemStyle: {
          emphasis: {
            areaColor: false,
            label: { show: false }
          }
        },
        scaleLimit: {
          min: 1
        },
        zoom: 1.2,
        data
      }
    ]
  }

  if (mapType === "china") {
    option.series[0].center = [105, 36]
  } else {
    option.series[0].center = [10, 15]
  }
  if (data.length !== 0) {
    option.visualMap = {
      min: 0,
      max: Math.max(...values),
      text: ['最大值', '最小值'],
      realtime: false,
      calculable: true,
      textStyle: textStyle,
      inRange: {
        color: ["#f79992", "#d73435"]
      },
      // left: "0",
      // top: "10px"
    }
  }

  return option

}


@WithCommonProps
export default class MapCharts extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      height: 500
    }
  }
  componentDidMount() {
    this.setHeight()
    window.addEventListener("resize", this.setHeight)
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.setHeight)
  }
  setHeight = () => this.setState({
    height: document.body.offsetHeight - 250
  })
  render() {
    const { theme, mapType, data } = this.props

    return (
      <ReactEcharts
        style={{ width: "100%", height: this.state.height + "px" }}
        option={getOption({ theme, data: data[mapType], mapType })}>
      </ReactEcharts>
    )
  }
}