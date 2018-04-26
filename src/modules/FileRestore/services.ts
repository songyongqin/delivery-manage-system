import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetch = commonRequestCreator.get(httpApi.FILE_RESTORE)


