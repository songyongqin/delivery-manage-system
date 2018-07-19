import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {
  return dynamic({
    app,
    models: () => [
      System.import(/* webpackChunkName: "AssetsListModel" */'modules/Audit_Assets/models/assetsList'),
      System.import(/* webpackChunkName: "AssetsloopholeModel" */'modules/Audit_Assets/models/loophole'),
      System.import(/* webpackChunkName: "AssetsPortModel" */'modules/Audit_Assets/models/port'),

    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "AuditAssetsPage" */'modules/Audit_Assets')
      .then(page => WithRouteInit(url)(page.default)),
  })

}