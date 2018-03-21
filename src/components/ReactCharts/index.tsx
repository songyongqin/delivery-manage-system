import * as React from 'react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'


export default (props) => (
  <ReactEchartsCore
    echarts={echarts}
    notMerge={true}
    lazyUpdate={true}
    {...props} />
)