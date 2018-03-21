import { asyncComponent } from 'react-async-component'
import Spin from 'domainComponents/Spin'
import * as React from 'react'
export default asyncComponent({
  name: 'asyncReactCharts',
  resolve: () => System.import(/* webpackChunkName: "asyncComponents/ReactCharts" */"./index"),
  LoadingComponent: () => (
    <Spin spinning={true}>
      <div>

      </div>
    </Spin>
  ),
})
