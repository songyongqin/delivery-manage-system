import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import('modules/Report/models/Model_attack'),
      System.import('modules/Report/models/Model_call_on_domain'),
      System.import('modules/Report/models/Model_call_on_ip'),
      System.import('modules/Report/models/Model_chart_statistical'),
      System.import('modules/Report/models/Model_fall_host'),
      System.import('modules/Report/models/Model_have_communicate_inside_ip'),
      System.import('modules/Report/models/Model_mal_domain'),
      System.import('modules/Report/models/Model_mal_ip'),
      System.import('modules/Report/models/Model_statistical_chart'),
      System.import('modules/Report/models/Model_suffer_host_call_on_record'),
      System.import('modules/Report/models/Model_threat_event'),
      System.import('modules/Report/models/Model_threat_info'),
      System.import('modules/Report/model'),

    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "ReportPage" */'modules/Report')
      .then(page => WithRouteInit(url)(page.default)),
  })

}