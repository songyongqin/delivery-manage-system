import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import(/* webpackChunkName: "AuditCaughtreCordModel" */'modules/Audit_Caught/models/caughtRecord'),
      System.import(/* webpackChunkName: "AuditCaughtTaskModel" */'modules/Audit_Caught/models/caughtTask'),
    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "AuditCaughtPage" */'modules/Audit_Caught')
      .then(page => WithRouteInit(url)(page.default)),
  })

}