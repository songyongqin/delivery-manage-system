import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
    ],
    component: () => System.import(/* webpackChunkName: "ThreatAnalyse_Event" */'containers/ThreatAnalyse_Event')
      .then(page => WithRouteInit(url)(page)),
  })

}