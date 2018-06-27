import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
import isSuccess from 'domainUtils/isSuccess'
import { getTemp } from 'utils'
import { uploadFile } from 'utils/fileSplitUpload'
import { getToken } from 'domain/user'
import { isSecret, decrypt } from 'domain/secret'
const httpApi = ApiConfig.http
import { fetchDiskResPipeCreator, getUpdateOptionsByPayload, fetchDeviceInfoResPipe } from './domainUtils'
import {
  CONNECT_STATUS_DATAINDEX, CONNECT,
  MD5_DATA_INDEX,
  CHUNK_DATA_INDEX,
  CURRENT_CHUNK_DATA_INDEX
} from './constants'
import isDev from 'utils/isDev'
import request from 'domainUtils/request'
/**
 *Master 
 */
const _fetchDeviceMaster = commonRequestCreator.get(httpApi.DEVICE_MASTER)

export const fetchDeviceMaster = payload => {
  return _fetchDeviceMaster(payload).then(fetchDeviceInfoResPipe)
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

const _fetchDeviceIDSDisk = commonRequestCreator.get(httpApi.DEVICE_IDS_DISK)

export const fetchDeviceIDSDisk = payload => {
  return _fetchDeviceIDSDisk(payload).then(fetchDiskResPipeCreator("ids"))
}

export const putDeviceIDSDisk = commonRequestCreator.put(httpApi.DEVICE_IDS_DISK)

/**
 *Honeypot Standalone  
 */
const _fetchDeviceHoneypotStandalone = commonRequestCreator.get(httpApi.DEVICE_HONEYPOT_STANDALONE)

export const fetchDeviceHoneypotStandalone = payload => {
  return _fetchDeviceHoneypotStandalone(payload).then(fetchDeviceInfoResPipe)
}

const _fetchDeviceHoneypotStandaloneDisk = commonRequestCreator.get(httpApi.DEVICE_HONEYPOT_STANDALONE_DISK)

export const fetchDeviceHoneypotStandaloneDisk = payload => {
  return _fetchDeviceHoneypotStandaloneDisk(payload).then(fetchDiskResPipeCreator("control"))
}

const _putDeviceHoneypotStandaloneDisk = commonRequestCreator.put(httpApi.DEVICE_HONEYPOT_STANDALONE_DISK)

export const putDeviceHoneypotStandaloneDisk = payload => {
  return _putDeviceHoneypotStandaloneDisk({ ...payload, control: 1 })
}


/**
 *IDS Standalone  
 */
export const fetchDeviceIDSStandalone = commonRequestCreator.get(httpApi.DEVICE_IDS_STANDALONE)

const _fetchDeviceIDSStandaloneDisk = commonRequestCreator.get(httpApi.DEVICE_IDS_STANDALONE_DISK)

export const fetchDeviceIDSStandaloneDisk = payload => {
  return _fetchDeviceIDSStandaloneDisk(payload).then(fetchDiskResPipeCreator("ids"))
}

export const putDeviceIDSStandaloneDisk = commonRequestCreator.put(httpApi.DEVICE_IDS_STANDALONE_DISK)


/*
* Common
*/
export const postLicence = commonRequestCreator.post(httpApi.DEVICE_LICENCE)

export const postDisk = commonRequestCreator.post(httpApi.DEVICE_DISK)

export const fetchMasterIP = commonRequestCreator.get(httpApi.SYS_CONFIG_NETWORK_MASTER)

export const fetchVersionInfoByLocal = payload => {
  return request(httpApi.DEVICE_UPDATE_INFO_LOCAL, getUpdateOptionsByPayload(payload))
}

export const updateByLocal = payload => {
  console.info("intxxxxxxxxxxxxx")
  return request(httpApi.DEVICE_UPDATE_LOCAL, getUpdateOptionsByPayload(payload))
}

export const fetchVersionInfoByRemote = commonRequestCreator.post(httpApi.DEVICE_UPDATE_INFO_ONLINE)

export const updateByRemote = commonRequestCreator.post(httpApi.DEVICE_UPDATE_ONLINE)

//后续
export const updateRemoteProgress = commonRequestCreator.get(httpApi.MIRROR_UPDATE_PROGRESS)

export const getUploadTask = commonRequestCreator.get(httpApi.DEVICE_UPDATE_LOCAL)

export const createUploadTask = commonRequestCreator.post(httpApi.DEVICE_UPDATE_LOCAL)

export const mergeUploadTask = commonRequestCreator.post(httpApi.DEVICE_UPDATE_LOCAL_MERGE)

export const putFileChunk = payload => {
  const fd = new FormData();
  const md5 = payload[MD5_DATA_INDEX],
    currentChunk = payload[CURRENT_CHUNK_DATA_INDEX],
    chunk = payload[CHUNK_DATA_INDEX]

  fd.append("chunk", chunk)
  fd.append("currentChunk", currentChunk)
  fd.append("md5", md5)


  return uploadFile({
    url: httpApi.DEVICE_UPDATE_LOCAL,
    headers: {
      "access-token": getToken()
    },
    body: fd,
  }).then(res => {

    try {
      if (!isSecret()) {
        return res
      }

      return JSON.parse(decrypt(res))
    } catch (e) {
      return { status: -1, message: e.message }
    }
  })

}


/**
 *Honeypot Node
 */
const _fetchDeviceHoneypotNode = commonRequestCreator.getWithQueryString(httpApi.DEVICE_HONEYPOT_NODE)

export const fetchDeviceHoneypotNode = payload => {
  return _fetchDeviceHoneypotNode(payload).then(fetchDeviceInfoResPipe)
}
/**
 *IDS Node
 */
export const fetchDeviceIDSNode = commonRequestCreator.getWithQueryString(httpApi.DEVICE_IDS_NODE)

/**
 *  IDS common
 */
export const fetchVersionInfoByLocalIDS = payload => {
  return request(httpApi.DEVICE_UPDATE_INFO_LOCAL_IDS, getUpdateOptionsByPayload(payload))
}

export const updateByLocalIDS = payload => {
  return request(httpApi.DEVICE_UPDATE_LOCAL_IDS, getUpdateOptionsByPayload(payload))
}

export const fetchVersionInfoByRemoteIDS = commonRequestCreator.post(httpApi.DEVICE_UPDATE_INFO_ONLINE_IDS)

export const updateByRemoteIDS = commonRequestCreator.post(httpApi.DEVICE_UPDATE_ONLINE_IDS)