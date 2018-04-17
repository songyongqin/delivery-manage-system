import { ANALYSE_OVERALL_SYSTEM_NAMESPACE } from 'constants/model'
import { fetchOverallSystem } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_OVERALL_SYSTEM_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchOverallSystem)
  }
}