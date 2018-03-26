import { ANALYSE_RANKING_NAMESPACE } from 'constants/model'
import { fetchRanking } from '../services'
import { baseCommonEffectCreator } from 'domainUtils/commonEffectCreator'


export default {
  namespace: ANALYSE_RANKING_NAMESPACE,
  effects: {
    fetch: baseCommonEffectCreator(fetchRanking)
  }
}