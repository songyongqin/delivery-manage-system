import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'

export default (app: any, url: string): React.Component => {
  return dynamic({
    app,
    models: () => [
      
    ],
    component: () => System.import(/* webpackChunkName: "Login" */'modules/Login')
      .then(page => WithRouteInit(url)(page.default)),
  })
}