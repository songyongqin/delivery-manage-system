import { ANALYSE_EVENT_VIEW } from 'constants/model'
import { 
    // fetchAnalyseView,
    postAnalyseView } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_EVENT_VIEW,
  effects: {
    // fetch: commonEffectCreator(fetchAnalyseView),
    post: commonEffectCreator(postAnalyseView)
  }
}