import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http


export const fetchAnalyseAttackedCount= commonRequestCreator.getWithQueryString(httpApi.ANALYSE_ATTACKED_COUNT)


