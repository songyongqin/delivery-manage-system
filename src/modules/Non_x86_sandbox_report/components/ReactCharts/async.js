import { asyncComponent } from 'react-async-component'
import { Spin } from 'antd'
import React from 'react'

export default asyncComponent({
  name: 'reactChartsAsync',
  resolve: () => new Promise((resolve) => {
    require.ensure([], (require) => {
      resolve(require("./index"))
    }, 'reactChartsAsync')
  }),
  LoadingComponent: ({ style = {} }) => (
    <Spin spinning={true}>
      <div style={{ height: "400px", ...style }}></div>
    </Spin>
  ),
})
