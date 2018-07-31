import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http




export const fetchThreatReportRank = commonRequestCreator.getWithQueryString(httpApi.REPORT_RANK_THREAT)



