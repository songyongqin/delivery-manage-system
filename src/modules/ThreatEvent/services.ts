import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchThreatEventExploit = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_EVENT_EXPLOIT)

export const fetchThreatEventTool = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_EVENT_TOOL)

export const fetchTreatEventInfo = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_EVENT_THREAT_INFO)

export const exportThreatEventExploit = commonRequestCreator.post(httpApi.ANALYSE_EVENT_EXPLOIT)

export const exportThreatEventTool = commonRequestCreator.post(httpApi.ANALYSE_EVENT_TOOL)

export const exportThreatEventInfo = commonRequestCreator.post(httpApi.ANALYSE_EVENT_THREAT_INFO)