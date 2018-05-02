import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchThreatDistribution = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_DISTRIBUTION)