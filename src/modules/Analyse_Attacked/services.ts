import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http



export const fetchAnalyseAttackedView = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_ATTACKED_VIEW)

export const fetchAnalyseAttackedSearch = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_ATTACKED_SEARCH)

export const fetchAnalyseAttackedCount= commonRequestCreator.getWithQueryString(httpApi.ANALYSE_ATTACKED_COUNT)

export const fetchAnalyseAttackedDetails = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_ATTACKED_DETAILS)

export const fetchAnalyseAttackedDetailsCc = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_ATTACKED_DETAILS_CC)

