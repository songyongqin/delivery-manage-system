import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'
import asyncModulePipe from './utils/asyncModulePipe'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      // System.import('modules/Threat_Report/models/Model_attack'),
      // System.import('modules/Threat_Report/models/Model_call_on_domain'),
      // System.import('modules/Threat_Report/models/Model_call_on_ip'),
      // System.import('modules/Threat_Report/models/Model_chart_statistical'),
      // System.import('modules/Threat_Report/models/Model_fall_host'),
      // System.import('modules/Threat_Report/models/Model_have_communicate_inside_ip'),
      // System.import('modules/Threat_Report/models/Model_mal_domain'),
      // System.import('modules/Threat_Report/models/Model_mal_ip'),
      // System.import('modules/Threat_Report/models/Model_statistical_chart'),
      // System.import('modules/Threat_Report/models/Model_suffer_host_call_on_record'),
      // System.import('modules/Threat_Report/models/Model_threat_event'),
      // System.import('modules/Threat_Report/models/Model_threat_info'),
      System.import('modules/Threat_Report/model'),

    ].map(asyncModulePipe),
    component: () => System.import(/* webpackChunkName: "ThreatReportPage" */'modules/Threat_Report')
      .then(page => WithRouteInit(url)(page.default)),
  })

}