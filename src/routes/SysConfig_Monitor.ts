import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import(/* webpackChunkName: "SysConfigMonitorMasterModel" */'modules/SysConfig_Monitor/models/master'),
      System.import(/* webpackChunkName: "SysConfigMonitorIDSModel" */'modules/SysConfig_Monitor/models/ids'),
      System.import(/* webpackChunkName: "SysConfigMonitorHoneypotModel" */'modules/SysConfig_Monitor/models/honeypot'),
    ],
    component: () => System.import(/* webpackChunkName: "SysConfigMonitorPage" */'modules/SysConfig_Monitor')
      .then(page => WithRouteInit(url)(page.default)),
  })

}