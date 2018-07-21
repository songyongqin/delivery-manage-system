import { ANALYSE_THREAT_DETAIL } from 'constants/model'
import {  fetchThreatFamilyEventDetail,
          fetchThreatFamilyAssetsDetail,
          fetchThreatFamilyCcDetail,
          fetchThreatLoopholeEventDetail,
          fetchThreatLoopholeAssetsDetail,
          fetchThreatLoopholeCcDetail   } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_THREAT_DETAIL,
  effects: {
    fetchFamilyEvent: commonEffectCreator(fetchThreatFamilyEventDetail),
    fetchFamilyAssets:commonEffectCreator(fetchThreatFamilyAssetsDetail),
    fetchFamilyCc: commonEffectCreator(fetchThreatFamilyCcDetail),

    fetchLoopholeEvent: commonEffectCreator(fetchThreatLoopholeEventDetail),
    fetchLoopholeAssets:commonEffectCreator(fetchThreatLoopholeAssetsDetail),
    fetchLoopholeCc: commonEffectCreator(fetchThreatLoopholeCcDetail),
  }
}


