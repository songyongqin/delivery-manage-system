import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchAuditEvent = commonRequestCreator.getWithQueryString(httpApi.AUDIT_EVENT)

export const postAuditEvent = commonRequestCreator.post(httpApi.AUDIT_EVENT)

