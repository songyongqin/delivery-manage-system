import { ANALYSE_OVERALL_PCAP_NAMESPACE } from 'constants/model'
import { fetchOverallPCAP } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_OVERALL_PCAP_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchOverallPCAP)
  }
}