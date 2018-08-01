import { THREAT_REPORT_RANK_NAMESPACE } from 'constants/model'
import {  fetchThreatReportRank} from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: THREAT_REPORT_RANK_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchThreatReportRank),
  }
}


