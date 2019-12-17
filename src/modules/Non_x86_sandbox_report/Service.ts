// import request from '../../utils/request';
// import { ApiConfig } from '../../configs/AppConfig';
// import * as tools from '../../utils/tools';
// import commonRequestCreator from '../../utils/commonRequestCreator'

// export const getReport = commonRequestCreator.getWithQueryString(ApiConfig.non_x86_sandbox_report)


import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const getReport = commonRequestCreator.getWithQueryString(httpApi.non_x86_sandbox_report)



