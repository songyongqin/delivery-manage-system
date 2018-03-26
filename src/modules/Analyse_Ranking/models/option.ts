import { ANALYSE_RANKING_OPTION_NAMESPACE } from 'constants/model'
import { fetchRankingOption } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_RANKING_OPTION_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchRankingOption)
  }
}