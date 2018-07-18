import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      // System.import(/* webpackChunkName: "EventStatisticsModel" */'modules/EventStatistics/model'),
      // System.import(/* webpackChunkName: "AnalyseEventModel" */'modules/Analyse_Event/model'),
      // System.import(/* webpackChunkName: "ThreatEventExploitModel" */'modules/ThreatEvent/models/exploit'),
      // System.import(/* webpackChunkName: "ThreatEventToolModel" */'modules/ThreatEvent/models/tool'),
      // System.import(/* webpackChunkName: "ThreatEventThreatInfoModel" */'modules/ThreatEvent/models/threatInfo'),

      System.import(/* webpackChunkName: "AnalyseViewModel" */'modules/Analyse_Attacker/model'),
      System.import(/* webpackChunkName: "AnalyseCountModel" */'modules/Analyse_Attacker/components/Count/model'),
    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "AnalyseAttackerPage" */'modules/Analyse_Attacker')
      .then(page => WithRouteInit(url)(page.default)),
  })

}