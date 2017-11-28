import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import { uploadFile, getTemp, jsonToQueryString } from 'utils/tools';
import commonRequestCreator from 'utils/commonRequestCreator'
const httpApi = ApiConfig.http;
import {
  MIRROR_SUMMARY,
  OPERATION_NAMESPACE,
  MD5_DATA_INDEX,
  CHUNK_DATA_INDEX,
  CURRENT_CHUNK_DATA_INDEX
} from './ConstConfig'
export const updateRemote = commonRequestCreator.post(httpApi.MIRROR_UPDATE_REMOTE)

export const createUploadTask = commonRequestCreator.post(httpApi.MIRROR_UPDATE_LOCAL)

export const getUploadTask = commonRequestCreator.get(httpApi.MIRROR_UPDATE_LOCAL)

export const mergeUploadTask = commonRequestCreator.post(httpApi.MIRROR_UPDATE_LOCAL_MERGE)

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