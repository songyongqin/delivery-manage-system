import { SYS_CONFIG_NETWORK_AUTH_NAMESPACE } from 'constants/model'
import { fetchAuthNetworkConfig, putAuthNetworkConfig } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: SYS_CONFIG_NETWORK_AUTH_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchAuthNetworkConfig),
    put: commonEffectCreator(putAuthNetworkConfig, 1000),
  }
}