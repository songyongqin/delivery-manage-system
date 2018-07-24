import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchcaughtRecord = commonRequestCreator.getWithQueryString(httpApi.AUDIT_CAUGHT_RECORD_DETAIL)

export const fetchcaughtTask = commonRequestCreator.getWithQueryString(httpApi.AUDIT_CAUGHT_TASK_DETAIL)

export const putCaughtTask = commonRequestCreator.put(httpApi.AUDIT_CAUGHT_TASK_DETAIL)

export const delCaughtTask = commonRequestCreator.deleteWithQueryString(httpApi.AUDIT_CAUGHT_TASK_DETAIL)

export const postCaughtTask = commonRequestCreator.post(httpApi.AUDIT_CAUGHT_TASK_DETAIL)




