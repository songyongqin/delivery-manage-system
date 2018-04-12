import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import(/* webpackChunkName: "ManagerDeviceMasterModel" */'modules/Manager_Virtual/models/vm'),
      // System.import(/* webpackChunkName: "ManagerDeviceMasterModel" */'modules/Manager_Virtual/models/recordOfCreateVM'),
    ],
    component: () => System.import(/* webpackChunkName: "ManagerVMPage" */'modules/Manager_Virtual')
      .then(page => WithRouteInit(url)(page.default)),
  })

}