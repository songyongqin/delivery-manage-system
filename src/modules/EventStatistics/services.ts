import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchAnalyseEventStatistics = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_EVENT_STATISTICS)