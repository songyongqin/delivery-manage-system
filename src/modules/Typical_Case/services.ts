import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const getArr = commonRequestCreator.getWithQueryString(httpApi.TYPICAL_CASE_LIST)


