import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http




export const fetchAnalyseThreatCount = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_THREAT_COUNT)

export const fetchAnalyseThreatFamily = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_THREAT_FAMILY)

export const fetchAnalyseThreatLoophole= commonRequestCreator.getWithQueryString(httpApi.ANALYSE_THREAT_Loophole)



