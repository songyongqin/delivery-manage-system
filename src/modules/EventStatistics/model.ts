import { EVENT_STATISTICS_NAMESPACE } from 'constants/model'
import { fetchAnalyseEventStatistics } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: EVENT_STATISTICS_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchAnalyseEventStatistics)
  }
}