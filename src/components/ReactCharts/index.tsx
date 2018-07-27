import * as React from 'react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
// import 'echarts/theme/vintage'

// export default (props) => (
//   <ReactEchartsCore
//     echarts={echarts}
//     notMerge={true}
//     lazyUpdate={true}
//     {...props} />
// )

export default (props) =>{ 
  // console.log('props',props)
  return(
  <ReactEchartsCore
    echarts={echarts}
    notMerge={true}
    // theme={"vintage"}
    lazyUpdate={true}
    {...props} />
)}