import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import('modules/Report/models/Model_attack'),
      // System.import('modules/Report/models/Model_call_on_domain'),

    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "ReportPage" */'modules/Situation')
      .then(page => WithRouteInit(url)(page.default)),
  })

}