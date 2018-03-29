import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import(/* webpackChunkName: "SysConfigCloudDetectionModel" */'modules/SysConfig_Network/models/cloudDetection'),
      System.import(/* webpackChunkName: "SysConfigNetworkModel" */'modules/SysConfig_Network/models/network'),
      System.import(/* webpackChunkName: "SysConfigNetworkAuthModel" */'modules/SysConfig_Network/models/networkAuth'),
      System.import(/* webpackChunkName: "SysConfigNetworkDNSModel" */'modules/SysConfig_Network/models/networkDNS'),
      System.import(/* webpackChunkName: "SysConfigNetworkMasterModel" */'modules/SysConfig_Network/models/networkMaster'),
      System.import(/* webpackChunkName: "SysConfigSysLogModel" */'modules/SysConfig_Network/models/sysLog'),
    ],
    component: () => System.import(/* webpackChunkName: "SysConfigNetworkPage" */'modules/SysConfig_Network')
      .then(page => WithRouteInit(url)(page)),
  })

}