import { USER_MANAGER_IP_LIMIT_NAMESPACE } from 'constants/model'
import {
  fetchIPLimitConfig,
  deleteIPLimitConfig,
  postIPLimitConfig,
  putIPLimitConfig
} from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: USER_MANAGER_IP_LIMIT_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchIPLimitConfig),
    put: commonEffectCreator(putIPLimitConfig, 500),
    post: commonEffectCreator(postIPLimitConfig),
    delete: commonEffectCreator(deleteIPLimitConfig)
  }
}