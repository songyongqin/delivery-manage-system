import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
const httpApi = ApiConfig.http;

export async function query(payload) {
  /*
   * 转换参数格式
   * */
  let { timestampRange, ip } = payload;

  payload = {
    ...payload,
  };

  if (timestampRange.length !== 0) {
    payload.timestampRange = tools.momentToTimestamp(timestampRange)
  }

  if (ip === null || ip.trim().length === 0) {
    delete payload.ip;
  }

  const options = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  };
  return request(httpApi.ANALYSE_FALL_HOST + tools.jsonToQueryString(payload), options);
}
