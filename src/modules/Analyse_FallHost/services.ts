import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchAnalyseFallHost = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_FALL_HOST)
