import { asyncComponent } from 'react-async-component'
import Spin from 'domainComponents/Spin'
import * as React from 'react'
export default asyncComponent({
  name: 'asyncLineCharts',
  resolve: () => System.import(/* webpackChunkName: "asyncComponents/LineCharts" */"./index"),
  LoadingComponent: () => (
    <Spin spinning={true}>
      <div>

      </div>
    </Spin>
  ),
})