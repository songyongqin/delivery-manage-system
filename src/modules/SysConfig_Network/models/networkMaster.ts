import { SYS_CONFIG_NETWORK_MASTER_NAMESPACE } from 'constants/model'
import { fetchNetworkMasterConfig, putNetworkMasterConfig } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: SYS_CONFIG_NETWORK_MASTER_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchNetworkMasterConfig),
    put: commonEffectCreator(putNetworkMasterConfig, 1000),
  }
}