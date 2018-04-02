import { MANAGER_DEVICE_IDS_NODE_NAMESPACE } from 'constants/model'
import { fetchDeviceIDSNode, fetchDeviceIDSNodeDisk, putDeviceIDSNodeDisk } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: MANAGER_DEVICE_IDS_NODE_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchDeviceIDSNode),
    fetchDeviceDisk: commonEffectCreator(fetchDeviceIDSNodeDisk),
    putDeviceDisk: commonEffectCreator(putDeviceIDSNodeDisk, 500)
  }
}