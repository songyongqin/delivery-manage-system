import { ANALYSE_EVENT_VIEW } from 'constants/model'
import { 
    // fetchAnalyseView,
    getThreatAction,
    getThreatType,
    getAnalyseTableParmas,
    postAnalyseView  } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_EVENT_VIEW,
  effects: {
    // fetch: commonEffectCreator(fetchAnalyseView),
    post: commonEffectCreator(postAnalyseView),
    get: commonEffectCreator(getThreatType),
    getParmas:  commonEffectCreator(getAnalyseTableParmas),
    getThreatAction: commonEffectCreator(getThreatAction) 
  }
}