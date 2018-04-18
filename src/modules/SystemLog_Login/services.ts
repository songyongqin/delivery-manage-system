import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http
import isSuccess from 'domainUtils/isSuccess'

export const fetchSystemLogLogin = commonRequestCreator.getWithQueryString(httpApi.SYS_LOG_LOGIN)

export const exportSystemLogLogin = commonRequestCreator.post(httpApi.SYS_LOG_LOGIN)
