import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchLastEvent = commonRequestCreator.getWithQueryString(httpApi.OVERVIEW_LAST_EVENT)


