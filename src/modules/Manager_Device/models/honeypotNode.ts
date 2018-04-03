import { MANAGER_DEVICE_HONEYPOT_NODE_NAMESPACE } from 'constants/model'
import { fetchDeviceHoneypotNode, fetchDeviceHoneypotNodeDisk, putDeviceHoneypotNodeDisk, postLicence, postDisk } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: MANAGER_DEVICE_HONEYPOT_NODE_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchDeviceHoneypotNode),
    fetchDeviceDisk: commonEffectCreator(fetchDeviceHoneypotNodeDisk),
    putDeviceDisk: commonEffectCreator(putDeviceHoneypotNodeDisk, 500),
    postLicence: commonEffectCreator(postLicence, 500),
    postDisk: commonEffectCreator(postDisk, 500)
  }
}