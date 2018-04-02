import { MANAGER_DEVICE_HONEYPOT_NODE_NAMESPACE } from 'constants/model'
import { fetchDeviceHoneypotNode, fetchDeviceHoneypotNodeDisk, putDeviceHoneypotNodeDisk } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: MANAGER_DEVICE_HONEYPOT_NODE_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchDeviceHoneypotNode),
    fetchDeviceDisk: commonEffectCreator(fetchDeviceHoneypotNodeDisk),
    putDeviceDisk: commonEffectCreator(putDeviceHoneypotNodeDisk, 500)
  }
}