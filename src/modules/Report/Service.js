import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
import commonRequestCreator from '../../utils/commonRequestCreator';
import request from '../../utils/request';
const httpApi = ApiConfig.http;

//攻击统计接口
export function getAttack(payload) {
  return request(httpApi.REPORT_STATISTICS + tools.jsonToQueryString(payload), {
    method: 'GET',
    header: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
//威胁事件接口
export function getthreatevent(payload) {
  return request(httpApi.ANALYSE_EVENT + tools.jsonToQueryString(payload), {
    method: 'GET',
    header: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
//失陷主机接口
export function getREPORT_FALL_HOST(payload) {
  return request(httpApi.REPORT_FALL_HOST + tools.jsonToQueryString(payload), {
    method: 'GET',
    header: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
//威胁情报接口
export function getREPORT_THREAT_INFO(payload) {
  return request(httpApi.REPORT_THREAT_INFO + tools.jsonToQueryString(payload), {
    method: 'GET',
    header: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
//恶意IP接口
export function getREPORT_MAL_IP(payload) {
  return request(httpApi.REPORT_MAL_IP + tools.jsonToQueryString(payload), {
    method: 'GET',
    header: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
//恶意域名
export function getREPORT_MAL_DOMAIN(payload) {
  return request(httpApi.REPORT_MAL_DOMAIN + tools.jsonToQueryString(payload), {
    method: 'GET',
    header: {
      "Content-Type": "application/json; charset=utf-8"
    },
  });
}
//内网受害主机访问外网恶意域名/IP
export function getREPORT_SUFFER_HOST_CALL_ON_RECORD(payload) {
  return request(httpApi.REPORT_SUFFER_HOST_CALL_ON_RECORD + tools.jsonToQueryString(payload), {
    method: 'GET',
    header: {
      "Content-Type": "application/json; charset=utf-8"
    },
  });
}
//有通讯记录的内网IP
export function getREPORT_HAVE_COMMUNICATE_INSIDE_IP(payload) {
  return request(httpApi.REPORT_HAVE_COMMUNICATE_INSIDE_IP + tools.jsonToQueryString(payload), {
    method: 'GET',
    header: {
      "Content-Type": "application/json; charset=utf-8"
    },
  });
}
//访问的外网IP
export function getREPORT_CALL_ON_IP(payload) {
  return request(httpApi.REPORT_CALL_ON_IP + tools.jsonToQueryString(payload), {
    method: 'GET',
    header: {
      "Content-Type": "application/json; charset=utf-8"
    },
  });
}
//访问的域名
export function getEPORT_CALL_ON_DOMAIN(payload) {
  return request(httpApi.REPORT_CALL_ON_DOMAIN + tools.jsonToQueryString(payload), {
    method: 'GET',
    header: {
      "Content-Type": "application/json; charset=utf-8"
    },
  });
}
//图表统计
export function getCHART_STATISTICAL(payload) {
  return request(httpApi.ANALYSE_RANKING + tools.jsonToQueryString(payload), {
    method: 'GET',
    header: {
      "Content-Type": "application/json; charset=utf-8"
    },
  });
}
//导出文件全部调用一个接口
export function onExport(payload) {
  const timestampRange = payload.timestampRange;
  const unixTime = [timestampRange[0].unix(), timestampRange[1].unix()]
  return request(httpApi.REPORT_EXPORT, {
    method: 'POST',
    header: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      ...payload,
      timestampRange: unixTime
    })
  });
}
