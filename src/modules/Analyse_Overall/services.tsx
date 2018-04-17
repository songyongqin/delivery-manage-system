import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchOverallSystem = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_OVERALL_SYSTEM)

export const fetchOverallCapture = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_OVERALL_CAPTURE)

export const fetchOverallPCAP = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_OVERALL_PCAP)

export const fetchOverallNetBasic = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_OVERALL_NET_BASIC)

export const fetchOverallLimitNetBasic = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_OVERALL_ABNORMAL)


