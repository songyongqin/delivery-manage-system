import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http




export const fetchAnalyseAttackerSearch = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_ATTACKER_SEARCH)



