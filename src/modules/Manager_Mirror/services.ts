import { getTemp } from 'utils'
import { uploadFile } from 'utils/fileSplitUpload'
import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
import isSuccess from 'domainUtils/isSuccess'
const httpApi = ApiConfig.http
import isDev from 'utils/isDev'
import { isSecret, decrypt } from 'domain/secret'
import request from 'domainUtils/request'
import {
  // MIRROR_SUMMARY,
  OPERATION_NAMESPACE,
  MD5_DATA_INDEX,
  CHUNK_DATA_INDEX,
  CURRENT_CHUNK_DATA_INDEX
} from './ConstConfig'
import { getToken } from 'domain/user'

export const updateRemote = commonRequestCreator.post(httpApi.MIRROR_UPDATE_REMOTE)

export const createUploadTask = commonRequestCreator.post(httpApi.MIRROR_UPDATE_LOCAL)

export const getUploadTask = commonRequestCreator.get(httpApi.MIRROR_UPDATE_LOCAL)

export const mergeUploadTask = commonRequestCreator.post(httpApi.MIRROR_UPDATE_LOCAL_MERGE)

export const updateNodeMirror = commonRequestCreator.post(httpApi.MIRROR_UPDATE_NODE)

export const putFileChunk = payload => {
  const fd = new FormData();
  const md5 = payload[MD5_DATA_INDEX],
    currentChunk = payload[CURRENT_CHUNK_DATA_INDEX],
    chunk = payload[CHUNK_DATA_INDEX]

  fd.append("chunk", chunk)
  fd.append("currentChunk", currentChunk)
  fd.append("md5", md5)


  return uploadFile({
    url: httpApi.MIRROR_UPDATE_LOCAL,
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
export const fetchMirrorSummary = commonRequestCreator.getWithQueryString(httpApi.MIRROR_SUMMARY)

export const fetchMirrorNode = commonRequestCreator.getWithQueryString(httpApi.MIRROR_NODE)