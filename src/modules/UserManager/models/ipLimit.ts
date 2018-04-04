import { USER_MANAGER_IP_LIMIT_NAMESPACE } from 'constants/model'
import {
  fetchIPLimitConfig,
  deleteIPLimitConfig,
  postIPLimitConfig,
  putIPLimitConfig
} from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'
import { post } from '../../SysConfig_Strategy_WhiteList/Service';

export default {
  namespace: USER_MANAGER_IP_LIMIT_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchIPLimitConfig),
    put: commonEffectCreator(putIPLimitConfig),
    post: commonEffectCreator(postIPLimitConfig),
    delete: commonEffectCreator(deleteIPLimitConfig)
  }
}