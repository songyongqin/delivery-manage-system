import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http




export const fetchThreatReportCount = commonRequestCreator.getWithQueryString(httpApi.REPORT_COUNT_THREAT)



