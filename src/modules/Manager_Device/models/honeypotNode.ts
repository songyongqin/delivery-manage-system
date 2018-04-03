import { MANAGER_DEVICE_HONEYPOT_NODE_NAMESPACE } from 'constants/model'
import { fetchDeviceHoneypotNode, fetchMasterIP } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: MANAGER_DEVICE_HONEYPOT_NODE_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchDeviceHoneypotNode),
    fetchMasterIP: commonEffectCreator(fetchMasterIP)
  }
}