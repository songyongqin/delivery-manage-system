import { SYS_CONFIG_SYS_LOG_NAMESPACE } from 'constants/model'
import { fetchSysLogConfig, putSysLogConfig } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: SYS_CONFIG_SYS_LOG_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchSysLogConfig),
    put: commonEffectCreator(putSysLogConfig, 1000),
  }
}