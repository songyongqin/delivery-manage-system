import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchAnalyseEvent = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_EVENT)