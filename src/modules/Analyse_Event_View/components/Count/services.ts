import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchAnalyseEventCount = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_EVENT_VIEW_COUNT)
