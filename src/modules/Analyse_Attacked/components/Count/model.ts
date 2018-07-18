import { ANALYSE_ATTACKED_COUNT } from 'constants/model'
import { fetchAnalyseAttackedCount } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_ATTACKED_COUNT,
  effects: {
    fetchCount: commonEffectCreator(fetchAnalyseAttackedCount),
  }
}


