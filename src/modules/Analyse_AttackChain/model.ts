import { ANALYSE_ATTACK_CHAIN_NAMESPACE } from 'constants/model'
import { fetchAnalyseAttackChain } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_ATTACK_CHAIN_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchAnalyseAttackChain)
  }
}