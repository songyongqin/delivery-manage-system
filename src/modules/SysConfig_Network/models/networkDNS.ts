import { SYS_CONFIG_NETWORK_DNS_NAMESPACE } from 'constants/model'
import { fetchDNSConfig, putDNSConfig } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: SYS_CONFIG_NETWORK_DNS_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchDNSConfig),
    put: commonEffectCreator(putDNSConfig, 1000),
  }
}