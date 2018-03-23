import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import(/* webpackChunkName: "EarlyWarningEmailReceiveModel" */'modules/EarlyWarning_Email/models/receive'),
    ],
    component: () => System.import(/* webpackChunkName: "EmailWarningEmailPage" */'modules/EarlyWarning_Email')
      .then(page => WithRouteInit(url)(page)),
  })

}