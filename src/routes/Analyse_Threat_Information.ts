import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [

      System.import(/* webpackChunkName: "AnalyseThreatIntelligenceModel" */'modules/Analyse_Threat_Intelligence/model'),
    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "AnalyseThreatIntelligencePage" */'modules/Analyse_Threat_Intelligence')
      .then(page => WithRouteInit(url)(page.default)),
  })

}