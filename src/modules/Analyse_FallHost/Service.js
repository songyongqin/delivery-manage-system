import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
const httpApi = ApiConfig.http;

export const query = (payload) => {
  let { timestampRange, ip } = payload

  payload = {
    ...payload,
  }

  if (ip === null || ip.trim().length === 0) {
    delete payload.ip
  }

  return commonRequestCreator.get(httpApi.ANALYSE_FALL_HOST)

}