import { SYSTEM_LOG_LOGIN_NAMESPACE } from 'constants/model'
import { fetchSystemLogLogin, exportSystemLogLogin } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: SYSTEM_LOG_LOGIN_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchSystemLogLogin),
    exportLoginLog: commonEffectCreator(exportSystemLogLogin, 500)
  }
}