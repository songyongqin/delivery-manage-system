import { THREAT_EVENT_THREAT_INFO_NAMESPACE } from 'constants/model'
import { fetchTreatEventInfo } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: THREAT_EVENT_THREAT_INFO_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchTreatEventInfo)
  }
}