import { THREAT_REPORT_MODAL_NAMESPACE } from 'constants/model'
import {  
  fetchThreatEvent,
  postThreatEvent,
  fetchThreatGroup,
  postThreatGroup,
  fetchThreatAssets,
  postThreatAssets,
  fetchThreatFamily,
  postThreatFamily,
  fetchThreatIntelligence,
  postThreatIntelligence       } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: THREAT_REPORT_MODAL_NAMESPACE,
  effects: {
    fetchThreatEvent: commonEffectCreator(fetchThreatEvent),
    postThreatEvent: commonEffectCreator(postThreatEvent),
    fetchThreatGroup: commonEffectCreator(fetchThreatGroup),
    postThreatGroup: commonEffectCreator(postThreatGroup),
    fetchThreatAssets: commonEffectCreator(fetchThreatAssets),
    postThreatAssets: commonEffectCreator(postThreatAssets),
    fetchThreatFamily: commonEffectCreator(fetchThreatFamily),
    postThreatFamily: commonEffectCreator(postThreatFamily),
    fetchThreatIntelligence: commonEffectCreator(fetchThreatIntelligence),
    postThreatIntelligence: commonEffectCreator(postThreatIntelligence),
  }
}


