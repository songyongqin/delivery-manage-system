import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import { uploadFile, getTemp, jsonToQueryString, decrypt } from 'utils/tools';
import commonRequestCreator from 'utils/commonRequestCreator'
const httpApi = ApiConfig.http;
import {
  MIRROR_SUMMARY,
  OPERATION_NAMESPACE,
  MD5_DATA_INDEX,
  CHUNK_DATA_INDEX,
  CURRENT_CHUNK_DATA_INDEX
} from './ConstConfig'
import SecretKey from 'configs/SecretKey';
import { DEBUG_MODE } from 'configs/ConstConfig'

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
      "access-token": (getTemp("userData") || {}).token
    },
    body: fd,
  }).then(res => {

    try {
      if (sessionStorage.getItem(DEBUG_MODE)) {
        return res
      }

      return JSON.parse(decrypt(res, SecretKey))
    } catch (e) {
      console.info("putFileChunk:", e)
      return { status: -1, message: e.message }
    }
  })

}
export function getMIRROR_SUMMARY(payload) {
  return request(httpApi.MIRROR_SUMMARY + jsonToQueryString(payload), {
    method: 'GET',
    header: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
export function getMIRROR_NODE(payload) {
  return request(httpApi.MIRROR_NODE + jsonToQueryString(payload), {
    method: 'GET',
    header: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}