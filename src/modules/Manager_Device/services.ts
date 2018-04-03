import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
import isSuccess from 'domainUtils/isSuccess'
const httpApi = ApiConfig.http
import { fetchDiskResPipeCreator } from './domainUtils'
import { CONNECT_STATUS_DATAINDEX, CONNECT } from './constants'
/**
 *Master 
 */
const _fetchDeviceMaster = commonRequestCreator.get(httpApi.DEVICE_MASTER)

export const fetchDeviceMaster = payload => {
  return _fetchDeviceMaster(payload).then(res => {
    if (isSuccess(res)) {
      return {
        ...res,
        payload: {
          total: 1,
          data: [{ ...res.payload, [CONNECT_STATUS_DATAINDEX]: CONNECT }]
        }
      }
    }
    return res
  })
}

const _fetchDeviceMasterDisk = commonRequestCreator.get(httpApi.DEVICE_MASTER_DISK)

export const fetchDeviceMasterDisk = payload => {
  return _fetchDeviceMasterDisk(payload).then(fetchDiskResPipeCreator("control"))
}

const _putDeviceMasterDisk = commonRequestCreator.put(httpApi.DEVICE_MASTER_DISK)

export const putDeviceMasterDisk = payload => {
  return _putDeviceMasterDisk({ ...payload, control: 1 })
}

/**
 *Honeypot Node
 */
export const fetchDeviceHoneypotNode = commonRequestCreator.getWithQueryString(httpApi.DEVICE_HONEYPOT_NODE)

const _fetchDeviceHoneypotNodeDisk = commonRequestCreator.get(httpApi.DEVICE_HONEYPOT_NODE_DISK)

export const fetchDeviceHoneypotNodeDisk = payload => {
  return _fetchDeviceHoneypotNodeDisk(payload).then(fetchDiskResPipeCreator("control"))
}

const _putDeviceHoneypotNodeDisk = commonRequestCreator.put(httpApi.DEVICE_HONEYPOT_NODE_DISK)

export const putDeviceHoneypotNodeDisk = payload => {
  return _putDeviceHoneypotNodeDisk({ ...payload, control: 1 })
}
/**
 *IDS Node
 */
export const fetchDeviceIDSNode = commonRequestCreator.getWithQueryString(httpApi.DEVICE_IDS_NODE)

const _fetchDeviceIDSNodeDisk = commonRequestCreator.get(httpApi.DEVICE_IDS_NODE_DISK)

export const fetchDeviceIDSNodeDisk = payload => {
  return _fetchDeviceIDSNodeDisk(payload).then(fetchDiskResPipeCreator("ids"))
}

export const putDeviceIDSNodeDisk = commonRequestCreator.put(httpApi.DEVICE_IDS_NODE_DISK)


/**
 *Honeypot Standalone  
 */
export const fetchDeviceHoneypotStandalone = commonRequestCreator.get(httpApi.DEVICE_HONEYPOT_STANDALONE)

const _fetchDeviceHoneypotStandaloneDisk = commonRequestCreator.get(httpApi.DEVICE_HONEYPOT_STANDALONE_DISK)

export const fetchDeviceHoneypotStandaloneDisk = payload => {
  return _fetchDeviceHoneypotStandaloneDisk(payload).then(fetchDiskResPipeCreator("control"))
}

export const putDeviceHoneypotStandaloneDisk = commonRequestCreator.put(httpApi.DEVICE_HONEYPOT_STANDALONE_DISK)


/**
 *IDS Standalone  
 */
export const fetchDeviceIDSStandalone = commonRequestCreator.get(httpApi.DEVICE_IDS_STANDALONE)

export const fetchDeviceIDSStandaloneDisk = commonRequestCreator.get(httpApi.DEVICE_IDS_STANDALONE_DISK)

export const putDeviceIDSStandaloneDisk = commonRequestCreator.put(httpApi.DEVICE_IDS_STANDALONE_DISK)


/**
 *Honeypot 
 */
export const fetchDeviceHoneypot = commonRequestCreator.get(httpApi.DEVICE_HONEYPOT)

const _fetchDeviceHoneypotDisk = commonRequestCreator.get(httpApi.DEVICE_HONEYPOT_DISK)

export const fetchDeviceHoneypotDisk = payload => {
  return _fetchDeviceHoneypotDisk(payload).then(fetchDiskResPipeCreator("node"))
}

const _putDeviceHoneypotDisk = commonRequestCreator.put(httpApi.DEVICE_HONEYPOT_DISK)

export const putDeviceHoneypotDisk = payload => {
  return _putDeviceHoneypotDisk({ ...payload, control: 0 })
}
/**
 *IDS 
 */
export const fetchDeviceIDS = commonRequestCreator.get(httpApi.DEVICE_IDS)

export const fetchDeviceIDSDisk = commonRequestCreator.get(httpApi.DEVICE_IDS_DISK)

export const putDeviceIDSDisk = commonRequestCreator.put(httpApi.DEVICE_IDS_DISK)

/*
* Common
*/
export const postLicence = commonRequestCreator.post(httpApi.DEVICE_LICENCE)

export const postDisk = commonRequestCreator.post(httpApi.DEVICE_DISK)

export const updateOnline = commonRequestCreator.post(httpApi.DEVICE_UPDATE_ONLINE)

export const updateLocal = commonRequestCreator.post(httpApi.DEVICE_UPDATE_LOCAL)

export const fetchUpdateOnlineInfo = commonRequestCreator.post(httpApi.DEVICE_UPDATE_INFO_ONLINE)

export const fetchUpdateLocalInfo = commonRequestCreator.post(httpApi.DEVICE_UPDATE_INFO_LOCAL)

