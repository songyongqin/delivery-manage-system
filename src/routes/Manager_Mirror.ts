import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import(/* webpackChunkName: "ManagerMirrorSummaryModel" */'modules/Manager_Mirror/models/summary'),
      System.import(/* webpackChunkName: "ManagerMirrorNodeMirrorModel" */'modules/Manager_Mirror/models/node'),
    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "ManagerDevicePage" */'modules/Manager_Mirror')
      .then(page => WithRouteInit(url)(page.default)),
  })

}