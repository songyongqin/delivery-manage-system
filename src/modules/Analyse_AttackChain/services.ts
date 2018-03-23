import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchAnalyseAttackChain = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_ATTACK_CHAIN)