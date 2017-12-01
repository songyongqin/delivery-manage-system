import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
import commonRequestCreator from '../../utils/commonRequestCreator';
import request from '../../utils/request';
const httpApi = ApiConfig.http;
export function search(payload) {
  return request(httpApi.SYS_LOG_LOGIN + tools.jsonToQueryString(payload), {
    method: 'GET',
    header: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
export function onExport(payload) {
  const times = payload.timestampRange;
  const timestampRange = tools.momentToTimestamp(times);
  return request(httpApi.SYS_LOG_LOGIN, {
    method: 'POST',
    header: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload)
  });
}