import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http



export const fetchAnalyseAttackedDetails = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_ATTACKED_DETAILS)

export const fetchAnalyseAttackedDetailsCc = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_ATTACKED_DETAILS_CC)

