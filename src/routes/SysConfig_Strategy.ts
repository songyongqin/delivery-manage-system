import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import(/* webpackChunkName: "SysConfigStrategySettingModel" */'modules/SysConfig_Strategy/models/strategySetting'),
      System.import(/* webpackChunkName: "SysConfigStrategyRuleModel" */'modules/SysConfig_Strategy/models/strategyRule'),
    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "SysConfigMonitorPage" */'modules/SysConfig_Strategy')
      .then(page => WithRouteInit(url)(page.default)),
  })

}