import commonRequestCreator from 'utils/commonRequestCreator'
import ApiConfig from 'configs/ApiConfig'
import request from 'utils/request'
import * as tools from 'utils/tools';
const httpApi = ApiConfig.http;
export const get_mail = commonRequestCreator.getWithQueryString(httpApi.MAILREPORT_URL);
export const exportReport = commonRequestCreator.post(httpApi.REPORT_EMAILEXPORT)