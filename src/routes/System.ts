import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {
  console.log('system')
  return dynamic({
    app,
    models: () => [
      System.import('modules/System/model'),
    ].map(asyncModulePipe),
    component: () => System.import('modules/System')
      .then(page => WithRouteInit(url)(page.default)),
  })
}
