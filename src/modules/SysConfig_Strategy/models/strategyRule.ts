import { SYS_CONFIG_STRATEGY_RULE } from 'constants/model'
import { fetchRule, putRule, postRule, deleteRule } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: SYS_CONFIG_STRATEGY_RULE,
  effects: {
    fetch: commonEffectCreator(fetchRule),
    put: commonEffectCreator(putRule, 500),
    post: commonEffectCreator(postRule, 500),
    delete: commonEffectCreator(deleteRule, 500)
  }
}