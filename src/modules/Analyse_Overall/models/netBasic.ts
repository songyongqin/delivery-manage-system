import { ANALYSE_OVERALL_NET_BASIC_NAMESPACE } from 'constants/model'
import { fetchOverallNetBasic } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_OVERALL_NET_BASIC_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchOverallNetBasic)
  }
}