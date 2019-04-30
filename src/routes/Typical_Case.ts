import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import(/* webpackChunkName: "EarlyWarningEmailReceiveModel" */'modules/Typical_Case/model'),
    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "EmailWarningEmailPage" */'modules/Typical_Case')
      .then(page => WithRouteInit(url)(page.default)),
  })

}