import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchEvent = commonRequestCreator.getWithQueryString(httpApi.OVERVIEW_EVENT)

export const fetchFlow = commonRequestCreator.getWithQueryString(httpApi.OVERVIEW_FLOW)
