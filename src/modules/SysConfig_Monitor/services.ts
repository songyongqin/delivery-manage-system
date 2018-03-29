import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchMonitorLog = commonRequestCreator.getWithQueryString(httpApi.MODULE_MONITOR_LOG)

export const fetchMonitorConfig = commonRequestCreator.getWithQueryString(httpApi.MODULE_MONITOR)

export const putMonitorConfig = commonRequestCreator.put(httpApi.MODULE_MONITOR)