import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
const httpApi=ApiConfig.http;
import commonRequestCreator from '../../utils/commonRequestCreator';

export const testEmail=commonRequestCreator.post(httpApi.TEST_EMAIL)

export const query=commonRequestCreator.get(httpApi.WARNING_EMAIL_CONFIG)

export const put=commonRequestCreator.put(httpApi.WARNING_EMAIL_CONFIG)

