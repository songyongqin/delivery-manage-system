import { HOME_NAMESPACE } from 'constants/model'
import { fetchCount } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: HOME_NAMESPACE,
  effects: {
    fetchCount: commonEffectCreator(fetchCount),
  }
}