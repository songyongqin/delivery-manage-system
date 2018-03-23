import { ANALYSE_EVENT_NAMESPACE } from 'constants/model'
import { fetchAnalyseEvent } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_EVENT_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchAnalyseEvent)
  }
}