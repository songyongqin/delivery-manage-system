import { LAST_EVENT_NAMESPACE } from 'constants/model'
import { fetchLastEvent } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: LAST_EVENT_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchLastEvent)
  }
}