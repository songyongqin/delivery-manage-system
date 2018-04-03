import { MANAGER_DEVICE_IDS_STANDALONE_NAMESPACE } from 'constants/model'
import {
  fetchDeviceIDSStandalone,
  fetchDeviceIDSStandaloneDisk,
  putDeviceIDSStandaloneDisk,
  postLicence,
  postDisk,
  updateByLocalIDS,
  fetchVersionInfoByLocalIDS,
  updateByRemoteIDS,
  fetchVersionInfoByRemoteIDS
} from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: MANAGER_DEVICE_IDS_STANDALONE_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchDeviceIDSStandalone),
    fetchDeviceDisk: commonEffectCreator(fetchDeviceIDSStandaloneDisk),
    putDeviceDisk: commonEffectCreator(putDeviceIDSStandaloneDisk, 500),
    postLicence: commonEffectCreator(postLicence, 500),

    postDisk: commonEffectCreator(postDisk, 500),

    fetchVersionInfoByLocal: commonEffectCreator(fetchVersionInfoByLocalIDS),
    updateByLocal: commonEffectCreator(updateByLocalIDS),
    fetchVersionInfoByRemote: commonEffectCreator(fetchVersionInfoByRemoteIDS),
    updateByRemote: commonEffectCreator(updateByRemoteIDS)
  }
}