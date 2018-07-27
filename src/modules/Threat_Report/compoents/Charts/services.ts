import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http




export const fetchThreatReportDetail = commonRequestCreator.getWithQueryString(httpApi.REPORT_DETAIL_THREAT)



