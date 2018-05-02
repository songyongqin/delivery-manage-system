import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http
import isSuccess from 'domainUtils/isSuccess'
import momentToTimeStampRange from 'domainUtils/momentToTimeStampRange'

export const fetchSystemLogLogin = commonRequestCreator.getWithQueryString(httpApi.SYS_LOG_LOGIN)

const _exportSystemLogLogin = commonRequestCreator.post(httpApi.SYS_LOG_LOGIN)

export const exportSystemLogLogin = payload => {
  if ("timestampRange" in payload) {
    payload = {
      ...payload,
      timestampRange: momentToTimeStampRange(payload["timestampRange"])
    }
  }
  return _exportSystemLogLogin(payload)
}
