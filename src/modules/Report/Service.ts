import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
import isSuccess from 'domainUtils/isSuccess'
const httpApi = ApiConfig.http
import momentToTimeStampRange from 'domainUtils/momentToTimeStampRange'

//攻击统计接口
export const getAttack = commonRequestCreator.getWithQueryString(httpApi.REPORT_STATISTICS)
//威胁事件接口
export const getthreatevent = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_EVENT)
//失陷主机接口
export const getREPORT_FALL_HOST = commonRequestCreator.getWithQueryString(httpApi.REPORT_FALL_HOST)
//威胁情报接口
export const getREPORT_THREAT_INFO = commonRequestCreator.getWithQueryString(httpApi.REPORT_THREAT_INFO)
//恶意IP接口
export const getREPORT_MAL_IP = commonRequestCreator.getWithQueryString(httpApi.REPORT_MAL_IP)
//恶意域名
export const getREPORT_MAL_DOMAIN = commonRequestCreator.getWithQueryString(httpApi.REPORT_MAL_DOMAIN)
//内网受害主机访问外网恶意域名/IP
export const getREPORT_SUFFER_HOST_CALL_ON_RECORD = commonRequestCreator.getWithQueryString(httpApi.REPORT_SUFFER_HOST_CALL_ON_RECORD)
//有通讯记录的内网IP
export const getREPORT_HAVE_COMMUNICATE_INSIDE_IP = commonRequestCreator.getWithQueryString(httpApi.REPORT_HAVE_COMMUNICATE_INSIDE_IP)
//访问的外网IP
export const getREPORT_CALL_ON_IP = commonRequestCreator.getWithQueryString(httpApi.REPORT_CALL_ON_IP)
//访问的域名
export const getEPORT_CALL_ON_DOMAIN = commonRequestCreator.getWithQueryString(httpApi.REPORT_CALL_ON_DOMAIN)
//图表统计
export const getRankingOption = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_RANKING_OPTION)

export const getCHART_STATISTICAL = payload => {
  return commonRequestCreator.getWithQueryString(httpApi.ANALYSE_RANKING + "/" + payload.option)(payload)
}
//导出文件全部调用一个接口
const _onExport = commonRequestCreator.post(httpApi.REPORT_EXPORT)

export const onExport = payload => {
  if ("timestampRange" in payload) {
    payload = {
      ...payload,
      timestampRange: momentToTimeStampRange(payload["timestampRange"])
    }
  }
  return _onExport(payload)
}
