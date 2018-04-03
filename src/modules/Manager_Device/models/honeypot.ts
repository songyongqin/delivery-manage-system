import { MANAGER_DEVICE_HONEYPOT_NAMESPACE } from 'constants/model'
import { fetchDeviceHoneypot, fetchDeviceHoneypotDisk, putDeviceHoneypotDisk, postLicence, postDisk } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: MANAGER_DEVICE_HONEYPOT_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchDeviceHoneypot),
    fetchDeviceDisk: commonEffectCreator(fetchDeviceHoneypotDisk),
    putDeviceDisk: commonEffectCreator(putDeviceHoneypotDisk, 500),
    postLicence: commonEffectCreator(postLicence, 500),
    postDisk: commonEffectCreator(postDisk, 500)
  }
}