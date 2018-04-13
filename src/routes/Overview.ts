import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import(/* webpackChunkName: "EventStatisticsModel" */'modules/EventStatistics/model'),
      System.import(/* webpackChunkName: "LastEventModel" */'modules/LastEvent/model'),
      System.import(/* webpackChunkName: "ThreatEventExploitModel" */'modules/ThreatEvent/models/exploit'),
      System.import(/* webpackChunkName: "ThreatEventToolModel" */'modules/ThreatEvent/models/tool'),
      System.import(/* webpackChunkName: "ThreatEventThreatInfoModel" */'modules/ThreatEvent/models/threatInfo'),
      System.import(/* webpackChunkName: "OverviewEventModel" */'modules/Overview_Statistics/models/event'),
      System.import(/* webpackChunkName: "OverviewFlowModel" */'modules/Overview_Statistics/models/flow'),
    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "OverviewPage" */'modules/Overview')
      .then(page => WithRouteInit(url)(page.default)),
  })
}