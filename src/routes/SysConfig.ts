import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import(/* webpackChunkName: "EarlyWarningEmailReceiveModel" */'modules/SysConfig/models/receive'),
      System.import(/* webpackChunkName: "EarlyWarningEmailSendModel" */'modules/SysConfig/models/send'),
      System.import(/* webpackChunkName: "ExportNet" */'modules/SysConfig/models/net'),
    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "EmailWarningEmailPage" */'modules/SysConfig')
      .then(page => WithRouteInit(url)(page.default)),
  })

}