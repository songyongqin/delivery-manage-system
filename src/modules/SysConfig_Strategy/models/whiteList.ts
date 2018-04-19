import { SYS_CONFIG_STRATEGY_WHITE_LIST } from 'constants/model'
import { fetchWhiteList, putWhiteList, postWhiteList, deleteWhiteList, applyWhiteList } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: SYS_CONFIG_STRATEGY_WHITE_LIST,
  effects: {
    fetch: commonEffectCreator(fetchWhiteList),
    apply: commonEffectCreator(applyWhiteList, 500),
    post: commonEffectCreator(postWhiteList, 500),
    delete: commonEffectCreator(deleteWhiteList, 500),
    put: commonEffectCreator(putWhiteList, 500)
  }
}