import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import(/* webpackChunkName: "AnalyseThreatDistributionModel" */'modules/Analyse_ThreatDistribution/model'),
    ],
    component: () => System.import(/* webpackChunkName: "AnalyseThreatDistributionPage" */'modules/Analyse_ThreatDistribution')
      .then(page => WithRouteInit(url)(page)),
  })

}