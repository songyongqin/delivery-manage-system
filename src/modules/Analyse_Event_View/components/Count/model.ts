import { ANALYSE_EVENT_VIEW_COUNT } from 'constants/model'
import { fetchAnalyseEventCount } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_EVENT_VIEW_COUNT,
  effects: {
    fetch: commonEffectCreator(fetchAnalyseEventCount)
  }
}