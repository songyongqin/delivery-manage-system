import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
import commonRequestCreator from '../../utils/commonRequestCreator';
import request from '../../utils/request';
const httpApi = ApiConfig.http;

//攻击统计接口
export const getAttack = commonRequestCreator.get(httpApi.REPORT_STATISTICS)
//威胁事件接口
export const getthreatevent = commonRequestCreator.get(httpApi.ANALYSE_EVENT)
//失陷主机接口
export const getREPORT_FALL_HOST = commonRequestCreator.get(httpApi.REPORT_FALL_HOST)
//威胁情报接口
export const getREPORT_THREAT_INFO = commonRequestCreator.get(httpApi.REPORT_THREAT_INFO)

//恶意IP接口
export const getREPORT_MAL_IP = commonRequestCreator.get(httpApi.REPORT_MAL_IP)

//恶意域名
export const getREPORT_MAL_DOMAIN = commonRequestCreator.get(httpApi.REPORT_MAL_DOMAIN)

//内网受害主机访问外网恶意域名/IP
export const getREPORT_SUFFER_HOST_CALL_ON_RECORD = commonRequestCreator.get(httpApi.REPORT_SUFFER_HOST_CALL_ON_RECORD)

//有通讯记录的内网IP
export const getREPORT_HAVE_COMMUNICATE_INSIDE_IP = commonRequestCreator.get(httpApi.REPORT_HAVE_COMMUNICATE_INSIDE_IP)

//访问的外网IP
export const getREPORT_CALL_ON_IP = commonRequestCreator.get(httpApi.REPORT_CALL_ON_IP)
//访问的域名
export const getEPORT_CALL_ON_DOMAIN = commonRequestCreator.get(httpApi.REPORT_CALL_ON_DOMAIN)
//图表统计
export const getRankingOption = commonRequestCreator.get(httpApi.ANALYSE_RANKING_OPTION)
export function getCHART_STATISTICAL(payload) {
  return request(httpApi.ANALYSE_RANKING + payload.option + tools.jsonToQueryString(payload), {
    method: 'GET',
    header: {
      "Content-Type": "application/json; charset=utf-8"
    },
  });
}
//导出文件全部调用一个接口
export function onExport(payload) {
  const timestampRange = tools.momentToTimestamp(payload.timestampRange);
  return request(httpApi.REPORT_EXPORT, {
    method: 'POST',
    header: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      ...payload,
      timestampRange
    })
  });
}
