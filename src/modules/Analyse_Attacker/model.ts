import { ANALYSE_ATTACKER_VIEW } from 'constants/model'
import {  fetchAnalyseAttackerSearch} from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_ATTACKER_VIEW,
  effects: {
    fetchSearch: commonEffectCreator(fetchAnalyseAttackerSearch),
  }
}


