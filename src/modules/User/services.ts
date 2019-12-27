import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchTable = commonRequestCreator.getWithQueryString(httpApi.USER_TABLE)
export const deleteUser = commonRequestCreator.deleteWithQueryString(httpApi.USER_DELETE)
export const addUser = commonRequestCreator.post(httpApi.USER_ADD)





