import { THREAT_REPORT_DETAIL_NAMESPACE } from 'constants/model'
import {  fetchThreatReportDetail} from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: THREAT_REPORT_DETAIL_NAMESPACE,
  effects: {
    fetchDetail: commonEffectCreator(fetchThreatReportDetail),
  }
}


