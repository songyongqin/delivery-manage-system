import { ANALYSE_ATTACKER_DETAIL } from 'constants/model'
import {  fetchAnalyseAttackerDetailsIp,
  fetchAnalyseAttackerDetailsThreaten } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_ATTACKER_DETAIL,
  effects: {
    fetchIp: commonEffectCreator(fetchAnalyseAttackerDetailsIp),
    fetchThreat: commonEffectCreator(fetchAnalyseAttackerDetailsThreaten),
  }
}


