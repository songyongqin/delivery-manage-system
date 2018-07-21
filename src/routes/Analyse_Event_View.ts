import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [

      System.import(/* webpackChunkName: "AnalyseEventViewModel" */'modules/Analyse_Event_View/model'),
      System.import(/* webpackChunkName: "AnalyseEventViewCountModel" */'modules/Analyse_Event_View/components/Count/model'),

    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "AnalyseEventPage" */'modules/Analyse_Event_View')
      .then(page => WithRouteInit(url)(page.default)),
  })

}