import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchTable = commonRequestCreator.getWithQueryString(httpApi.SYSTEM_TABLE)
export const fetchExport = commonRequestCreator.post(httpApi.SYSTEM_EXPORT)



