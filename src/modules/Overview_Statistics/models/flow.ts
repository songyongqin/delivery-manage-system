import { OVERVIEW_STATISTICS_FLOW_NAMESPACE } from 'constants/model'
import { fetchFlow } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: OVERVIEW_STATISTICS_FLOW_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchFlow),
  }
}