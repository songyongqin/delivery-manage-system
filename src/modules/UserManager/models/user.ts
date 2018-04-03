import { USER_MANAGER_NAMESPACE } from 'constants/model'
import {
  fetchUser,
  postUser,
  putUser,
  delUser,
  patchUser,
  fetchUserConfig,
  putUserConfig
} from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: USER_MANAGER_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchUser),
    postUser: commonEffectCreator(postUser),
    putUser: commonEffectCreator(putUser),
    delUser: commonEffectCreator(delUser),
    patchUser: commonEffectCreator(patchUser),
    fetchUserConfig: commonEffectCreator(fetchUserConfig),
    putUseConfig: commonEffectCreator(putUserConfig, 500)
  }
}