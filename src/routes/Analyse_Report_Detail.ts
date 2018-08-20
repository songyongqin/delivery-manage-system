import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import(/* webpackChunkName: "AnalyseModel" */ 'modules/Analyse_Report_Detail/Model'),

      // System.import(/* webpackChunkName: "DetectionModel" */ 'modules/Detection/Model'),
    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "AnalysePage" */'modules/Analyse_Report_Detail')
      .then(page => WithRouteInit(url)(page.default)),
  });
}





