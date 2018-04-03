import { MANAGER_DEVICE_HONEYPOT_STANDALONE_NAMESPACE } from 'constants/model'
import {
  fetchDeviceHoneypotStandalone,
  fetchDeviceHoneypotStandaloneDisk,
  putDeviceHoneypotStandaloneDisk,
  postLicence,
  postDisk,
  updateByLocal,
  fetchVersionInfoByLocal,
  updateByRemote,
  fetchVersionInfoByRemote
} from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: MANAGER_DEVICE_HONEYPOT_STANDALONE_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchDeviceHoneypotStandalone),
    fetchDeviceDisk: commonEffectCreator(fetchDeviceHoneypotStandaloneDisk),
    putDeviceDisk: commonEffectCreator(putDeviceHoneypotStandaloneDisk, 500),
    postLicence: commonEffectCreator(postLicence, 500),
    postDisk: commonEffectCreator(postDisk, 500),
    fetchVersionInfoByLocal: commonEffectCreator(fetchVersionInfoByLocal),
    updateByLocal: commonEffectCreator(updateByLocal),
    fetchVersionInfoByRemote: commonEffectCreator(fetchVersionInfoByRemote),
    updateByRemote: commonEffectCreator(updateByRemote)
  }
}