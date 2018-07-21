import { ANALYSE_EVENT_VIEW } from 'constants/model'
import { fetchAnalyseEvent } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_EVENT_VIEW,
  effects: {
    fetch: commonEffectCreator(fetchAnalyseEvent)
  }
}