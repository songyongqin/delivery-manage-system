import { MANAGER_DEVICE_IDS_NAMESPACE } from 'constants/model'
import {
  fetchDeviceIDS,
  fetchDeviceIDSDisk,
  putDeviceIDSDisk,
  postLicence,
  postDisk,
  updateByLocalIDS,
  fetchVersionInfoByLocalIDS,
  updateByRemoteIDS,
  fetchVersionInfoByRemoteIDS
} from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: MANAGER_DEVICE_IDS_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchDeviceIDS),
    fetchDeviceDisk: commonEffectCreator(fetchDeviceIDSDisk),
    putDeviceDisk: commonEffectCreator(putDeviceIDSDisk, 500),
    postLicence: commonEffectCreator(postLicence, 500),

    postDisk: commonEffectCreator(postDisk, 500),

    fetchVersionInfoByLocal: commonEffectCreator(fetchVersionInfoByLocalIDS),
    updateByLocal: commonEffectCreator(updateByLocalIDS),
    fetchVersionInfoByRemote: commonEffectCreator(fetchVersionInfoByRemoteIDS),
    updateByRemote: commonEffectCreator(updateByRemoteIDS)
  }
}