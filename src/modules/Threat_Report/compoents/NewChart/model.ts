import { THREAT_REPORT_NEW_CHART_NAMESPACE } from 'constants/model'
import {  fetchThreatReportRank, fetchThreatReportDetail} from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: THREAT_REPORT_NEW_CHART_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchThreatReportRank),
    fetchDetail: commonEffectCreator(fetchThreatReportDetail),
  }
}


