import { OVERVIEW_STATISTICS_COUNT } from 'constants/model'
import { fetchCount, fetchFlow } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: OVERVIEW_STATISTICS_COUNT,
  effects: {
    fetchCount: commonEffectCreator(fetchCount),
    fetchFlow: commonEffectCreator(fetchFlow)
  }
}