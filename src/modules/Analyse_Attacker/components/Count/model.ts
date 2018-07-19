import { ANALYSE_ATTACKER_COUNT } from 'constants/model'
import { fetchAnalyseAttackerCount } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_ATTACKER_COUNT,
  effects: {
    fetchCount: commonEffectCreator(fetchAnalyseAttackerCount),
  }
}


