import { MANAGER_DEVICE_MASTER_NAMESPACE } from 'constants/model'
import {
  fetchDeviceMaster,
  fetchDeviceMasterDisk,
  putDeviceMasterDisk,
  postLicence,
  postDisk,
  updateByLocal,
  fetchVersionInfoByLocal,
  updateByRemote,
  fetchVersionInfoByRemote
} from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: MANAGER_DEVICE_MASTER_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchDeviceMaster),
    fetchDeviceDisk: commonEffectCreator(fetchDeviceMasterDisk),
    putDeviceDisk: commonEffectCreator(putDeviceMasterDisk, 500),
    postLicence: commonEffectCreator(postLicence, 500),

    postDisk: commonEffectCreator(postDisk, 500),

    fetchVersionInfoByLocal: commonEffectCreator(fetchVersionInfoByLocal),
    updateByLocal: commonEffectCreator(updateByLocal),
    fetchVersionInfoByRemote: commonEffectCreator(fetchVersionInfoByRemote),
    updateByRemote: commonEffectCreator(updateByRemote)
  }
}