import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchCount = commonRequestCreator.getWithQueryString(httpApi.OVERVIEW_COUNT)

export const fetchFlow = commonRequestCreator.getWithQueryString(httpApi.OVERVIEW_FLOW)
