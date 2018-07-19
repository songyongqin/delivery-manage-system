import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http



export const fetchAnalyseAttackerDetailsIp = commonRequestCreator.getWithQueryString(httpApi.ANALYSEATTACKER_DETAIL_IP)

export const fetchAnalyseAttackerDetailsThreaten = commonRequestCreator.getWithQueryString(httpApi.ANALYSEATTACKER_DETAIL_THREATEN)

