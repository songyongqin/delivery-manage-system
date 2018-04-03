import { MANAGER_DEVICE_IDS_NODE_NAMESPACE } from 'constants/model'
import { fetchDeviceIDSNode, fetchDeviceIDSNodeDisk, putDeviceIDSNodeDisk, postLicence, postDisk } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: MANAGER_DEVICE_IDS_NODE_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchDeviceIDSNode),
    fetchDeviceDisk: commonEffectCreator(fetchDeviceIDSNodeDisk),
    putDeviceDisk: commonEffectCreator(putDeviceIDSNodeDisk, 500),
    postLicence: commonEffectCreator(postLicence, 500),
    postDisk: commonEffectCreator(postDisk, 500)
  }
}