import { THREAT_REPORT_COUNT_NAMESPACE } from 'constants/model'
import {  fetchThreatReportCount} from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: THREAT_REPORT_COUNT_NAMESPACE,
  effects: {
    fetchCount: commonEffectCreator(fetchThreatReportCount),
  }
}


