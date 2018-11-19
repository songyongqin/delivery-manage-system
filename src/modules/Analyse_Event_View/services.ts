import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

// export const fetchAnalyseView = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_EVENT_VIEW)

export const postAnalyseView = commonRequestCreator.post(httpApi.ANALYSE_EVENT_VIEW)

export const getThreatType = commonRequestCreator.getWithQueryString(httpApi.SYS_CONFIG_STRATEGY_THREAT_NAME)

export const getThreatAction = commonRequestCreator.getWithQueryString(httpApi.STRATEGY_THREAT_ACTION)
