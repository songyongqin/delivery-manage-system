import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import(/* webpackChunkName: "AnalyseModel" */ 'modules/Analyse_Report/Model'),
      System.import(/* webpackChunkName: "AnalyseFileModel" */ 'modules/Analyse_Report/Models/fileModel'),
      System.import(/* webpackChunkName: "AnalyseMailModel" */ 'modules/Analyse_Report/Models/mailModel'),
      System.import(/* webpackChunkName: "AnalyseUrlModel" */ 'modules/Analyse_Report/Models/urlModel'),
      // System.import(/* webpackChunkName: "DetectionModel" */ 'modules/Detection/Model'),
    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "AnalysePage" */'modules/Analyse_Report')
      .then(page => WithRouteInit(url)(page.default)),
  });
}





