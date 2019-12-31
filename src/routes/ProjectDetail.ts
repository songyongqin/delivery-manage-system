import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import('modules/ProjectDetail/model'),
    ].map(asyncModulePipe),
    component: () => System.import('modules/ProjectDetail')
      .then(page => WithRouteInit(url)(page.default)),
  })
}