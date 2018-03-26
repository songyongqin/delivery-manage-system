import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchThreatDistribution = commonRequestCreator.get(httpApi.ANALYSE_DISTRIBUTION)