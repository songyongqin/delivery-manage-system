import { MANAGER_DEVICE_HONEYPOT_NAMESPACE } from 'constants/model'
import {
  fetchDeviceHoneypot,
  fetchDeviceHoneypotDisk,
  putDeviceHoneypotDisk,
  postLicence,
  postDisk,
  updateByLocal,
  fetchVersionInfoByLocal,
  updateByRemote,
  fetchVersionInfoByRemote
} from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: MANAGER_DEVICE_HONEYPOT_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchDeviceHoneypot),
    fetchDeviceDisk: commonEffectCreator(fetchDeviceHoneypotDisk),
    putDeviceDisk: commonEffectCreator(putDeviceHoneypotDisk, 500),
    postLicence: commonEffectCreator(postLicence, 500),

    postDisk: commonEffectCreator(postDisk, 500),

    fetchVersionInfoByLocal: commonEffectCreator(fetchVersionInfoByLocal),
    updateByLocal: commonEffectCreator(updateByLocal),
    fetchVersionInfoByRemote: commonEffectCreator(fetchVersionInfoByRemote),
    updateByRemote: commonEffectCreator(updateByRemote)
  }
}