import { SYS_CONFIG_STRATEGY_SNORT } from 'constants/model'
import { fetchSnort, putSnort, postSnort, deleteSnort } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: SYS_CONFIG_STRATEGY_SNORT,
  effects: {
    fetch: commonEffectCreator(fetchSnort),
    post: commonEffectCreator(postSnort),
    delete: commonEffectCreator(deleteSnort, 500),
    put: commonEffectCreator(putSnort, 500)
  }
}