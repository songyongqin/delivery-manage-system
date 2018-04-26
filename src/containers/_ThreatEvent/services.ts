import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchThreatEventExploit = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_EVENT_EXPLOIT)

export const fetchThreatEventTool = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_EVENT_TOOL)

export const fetchTreatEventInfo = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_EVENT_THREAT_INFO)