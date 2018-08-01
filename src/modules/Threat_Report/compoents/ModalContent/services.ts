import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http




export const fetchThreatEvent = commonRequestCreator.getWithQueryString(httpApi.REPORT_DETAIL_THREAT_THREATEVENT)

export const postThreatEvent = commonRequestCreator.post(httpApi.REPORT_DETAIL_THREAT_THREATEVENT)

export const fetchThreatGroup = commonRequestCreator.getWithQueryString(httpApi.REPORT_DETAIL_THREAT_THREATGROUP)

export const postThreatGroup = commonRequestCreator.post(httpApi.REPORT_DETAIL_THREAT_THREATGROUP)

export const fetchThreatAssets = commonRequestCreator.getWithQueryString(httpApi.REPORT_DETAIL_THREAT_ATTACKEDASSETS)

export const postThreatAssets = commonRequestCreator.post(httpApi.REPORT_DETAIL_THREAT_ATTACKEDASSETS)

export const fetchThreatFamily = commonRequestCreator.getWithQueryString(httpApi.REPORT_DETAIL_THREAT_THREATFAMILY)

export const postThreatFamily = commonRequestCreator.post(httpApi.REPORT_DETAIL_THREAT_THREATFAMILY)

export const fetchThreatIntelligence= commonRequestCreator.getWithQueryString(httpApi.REPORT_DETAIL_THREAT_INTELLIGENCE)

export const postThreatIntelligence= commonRequestCreator.post(httpApi.REPORT_DETAIL_THREAT_INTELLIGENCE)
