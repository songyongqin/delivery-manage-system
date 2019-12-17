import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [

      System.import(/* webpackChunkName: "NodeMonitor" */'modules/X86_sandbox_report/Model'),
    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "NodeMonitorPage" */'modules/X86_sandbox_report')
      .then(page => WithRouteInit(url)(page.default)),
  })

}