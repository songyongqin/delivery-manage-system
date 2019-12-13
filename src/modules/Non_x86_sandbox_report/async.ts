import { asyncComponent } from 'react-async-component'
import { Spin } from 'antd'
import React from 'react'

export default asyncComponent({
  name: 'non_x86_sandbox_reportPageAsync',
  resolve: () => new Promise((resolve) => {
    require.ensure([], (require) => {
      resolve(require("."))
    }, 'non_x86_sandbox_reportPageAsync')
  }),
  LoadingComponent: ({ style = {} }) => (
    <Spin spinning={true}>
      <div style={{ height: "400px", ...style }}></div>
    </Spin>
  ),
})