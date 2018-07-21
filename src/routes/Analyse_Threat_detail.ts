import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [

      System.import(/* webpackChunkName: "AnalyseThreatDetailModel" */'modules/Analyse_Threat_Detail/model'),
    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "AnalyseThreatDetailPage" */'modules/Analyse_Threat_Detail')
      .then(page => WithRouteInit(url)(page.default)),
  })

}