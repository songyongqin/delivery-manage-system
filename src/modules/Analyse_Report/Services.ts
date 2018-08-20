import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'

const httpApi = ApiConfig.http;
export const get = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_REPORT_FILE);
export const get_url = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_REPORT_URL);
export const get_mail = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_REPORT_MAIL);
