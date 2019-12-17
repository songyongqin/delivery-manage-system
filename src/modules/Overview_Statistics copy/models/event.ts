import { OVERVIEW_STATISTICS_EVENT_NAMESPACE } from 'constants/model'
import { fetchEvent } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: OVERVIEW_STATISTICS_EVENT_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchEvent),
  }
}