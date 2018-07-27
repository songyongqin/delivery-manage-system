import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [

      System.import('modules/Threat_Report/compoents/Charts/model'),
      System.import('modules/Threat_Report/compoents/Count/model'),
      System.import('modules/Threat_Report/model'),

    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "ThreatReportPage" */'modules/Threat_Report')
      .then(page => WithRouteInit(url)(page.default)),
  })

}