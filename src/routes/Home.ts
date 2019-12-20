import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import('modules/Home/model'),
    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "Login" */'modules/Home')
      .then(page => WithRouteInit(url)(page.default)),
  })
}