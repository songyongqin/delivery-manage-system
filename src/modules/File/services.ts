import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchTable = commonRequestCreator.getWithQueryString(httpApi.FILE_TABLE)
export const addFile = commonRequestCreator.post(httpApi.FILE_ADD)



