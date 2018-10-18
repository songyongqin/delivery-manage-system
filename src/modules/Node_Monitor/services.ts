import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http



export const fetchNodeMonitor = commonRequestCreator.getWithQueryString(httpApi.NODE_MONITOR)


