import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [

      System.import(/* webpackChunkName: "AnalyseViewModel" */'modules/Analyse_Attacker_Detail/model'),
    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "AnalyseAttackedPage" */'modules/Analyse_Attacker_Detail')
      .then(page => WithRouteInit(url)(page.default)),
  })

}