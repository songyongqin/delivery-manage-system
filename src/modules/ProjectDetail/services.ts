import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchTable = commonRequestCreator.getWithQueryString(httpApi.PROJECT_DETAIL_TABLE)
export const updateProjectDetail = commonRequestCreator.put(httpApi.PROJECT_DETAIL_TABLE)




