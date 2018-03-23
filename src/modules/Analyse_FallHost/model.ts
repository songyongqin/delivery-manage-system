import { ANALYSE_FALL_HOST_NAMESPACE } from 'constants/model'
import { fetchAnalyseFallHost } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_FALL_HOST_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchAnalyseFallHost)
  }
}