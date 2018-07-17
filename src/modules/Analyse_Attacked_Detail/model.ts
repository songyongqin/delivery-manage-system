import { ANALYSE_ATTACKED_DETAIL } from 'constants/model'
import {  fetchAnalyseAttackedDetails,
  fetchAnalyseAttackedDetailsCc } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_ATTACKED_DETAIL,
  effects: {
    fetchEvent: commonEffectCreator(fetchAnalyseAttackedDetails),
    fetchCc: commonEffectCreator(fetchAnalyseAttackedDetailsCc),
  }
}


