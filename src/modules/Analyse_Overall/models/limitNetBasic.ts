import { ANALYSE_OVERALL_LIMIT_NET_BASIC_NAMESPACE } from 'constants/model'
import { fetchOverallLimitNetBasic } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_OVERALL_LIMIT_NET_BASIC_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchOverallLimitNetBasic)
  }
}