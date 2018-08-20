import commonRequestCreator from 'utils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const getReport = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_REPORT_DETAILT_URL)

export const exportReport = commonRequestCreator.post(httpApi.ANALYSE_REPORT_DETAIL_EXPORT_URL)