import { SYS_CONFIG_NETWORK_NAMESPACE } from 'constants/model'
import { fetchNetworkConfig, putNetworkConfig } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: SYS_CONFIG_NETWORK_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchNetworkConfig),
    put: commonEffectCreator(putNetworkConfig, 1000),
  }
}