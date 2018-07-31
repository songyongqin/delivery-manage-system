import { asyncComponent } from 'react-async-component'
import Spin from 'domainComponents/Spin'
import * as React from 'react'
export default asyncComponent({
  name: 'asyncPieCharts',
  resolve: () => System.import(/* webpackChunkName: "asyncComponents/PieCharts" */"./index").then(x => x.default),
  LoadingComponent: () => (
    <Spin spinning={true}>
      <div>

      </div>
    </Spin>
  ),
})
