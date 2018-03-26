import { ANALYSE_THREAT_DISTRIBUTION_NAMESPACE } from 'constants/model'
import { fetchThreatDistribution } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_THREAT_DISTRIBUTION_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchThreatDistribution)
  }
}