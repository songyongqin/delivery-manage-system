import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import(/* webpackChunkName: "AnalyseOverallSystemModel" */'modules/Analyse_Overall/models/system'),
      System.import(/* webpackChunkName: "AnalyseOverallPcapModel" */'modules/Analyse_Overall/models/pcap'),
      System.import(/* webpackChunkName: "AnalyseOverallCaptureModel" */'modules/Analyse_Overall/models/capture'),
      System.import(/* webpackChunkName: "AnalyseOverallNetBasicModel" */'modules/Analyse_Overall/models/netBasic'),
      System.import(/* webpackChunkName: "AnalyseOverallLimitNetBasicModel" */'modules/Analyse_Overall/models/limitNetBasic'),

    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "AnalyseOverallPage" */'modules/Analyse_Overall')
      .then(page => WithRouteInit(url)(page.default)),
  })

}