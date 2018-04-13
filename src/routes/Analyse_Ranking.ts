import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import(/* webpackChunkName: "AnalyseRankingOptionModel" */'modules/Analyse_Ranking/models/option'),
      System.import(/* webpackChunkName: "AnalyseRankingModel" */'modules/Analyse_Ranking/models/ranking'),
    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "AnalyseRankingPage" */'modules/Analyse_Ranking')
      .then(page => WithRouteInit(url)(page.default)),
  })

}