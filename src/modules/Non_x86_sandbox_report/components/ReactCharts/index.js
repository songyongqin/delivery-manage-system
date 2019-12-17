import React from 'react'
import echarts from 'echarts/lib/echarts'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'


export default class MapCharts extends React.PureComponent {
  render() {
    return (
      <ReactEchartsCore
        echarts={echarts}
        notMerge={true}
        lazyUpdate={true}
        {...this.props}>
      </ReactEchartsCore>
    )
  }
}
