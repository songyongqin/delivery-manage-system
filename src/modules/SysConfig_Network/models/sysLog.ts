import { SYS_CONFIG_SYS_LOG_NAMESPACE } from 'constants/model'
import { fetchNetworkConfig, putNetworkConfig } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: SYS_CONFIG_SYS_LOG_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchNetworkConfig),
    put: commonEffectCreator(putNetworkConfig, 1000),
  }
}