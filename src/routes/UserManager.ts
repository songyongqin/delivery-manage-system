import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import(/* webpackChunkName: "UserManagerUserModel" */'modules/UserManager/models/user'),
      System.import(/* webpackChunkName: "UserManagerIPLimitModel" */'modules/UserManager/models/ipLimit'),
    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "UserManagerPage */'modules/UserManager')
      .then(page => WithRouteInit(url)(page.default)),
  })

}