import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import(/* webpackChunkName: "ManagerDeviceMasterModel" */'modules/Manager_Device/models/master'),
      System.import(/* webpackChunkName: "ManagerDeviceHoneypotModel" */'modules/Manager_Device/models/honeypot'),
      System.import(/* webpackChunkName: "ManagerDeviceIDSModel" */'modules/Manager_Device/models/ids'),

      System.import(/* webpackChunkName: "ManagerDeviceHoneypotNodeModel" */'modules/Manager_Device/models/honeypotNode'),
      System.import(/* webpackChunkName: "ManagerDeviceIDSNodeModel" */'modules/Manager_Device/models/idsNode'),

      System.import(/* webpackChunkName: "ManagerDeviceHoneypotStandaloneModel" */'modules/Manager_Device/models/honeypotStandalone'),
      System.import(/* webpackChunkName: "ManagerDeviceIDSStandaloneModel" */'modules/Manager_Device/models/idsStandalone'),
    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "ManagerDevicePage" */'modules/Manager_Device')
      .then(page => WithRouteInit(url)(page.default)),
  })

}