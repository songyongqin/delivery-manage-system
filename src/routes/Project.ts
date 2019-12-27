import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import('modules/Project/model'),
    ].map(asyncModulePipe),
    component: () => System.import('modules/Project')
      .then(page => WithRouteInit(url)(page.default)),
  })
}