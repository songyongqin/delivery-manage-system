import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
import commonRequestCreator from '../../utils/commonRequestCreator';

const httpApi=ApiConfig.http;

export const query=commonRequestCreator.get(httpApi.USER_IP_LIMIT,true)
export const _delete=commonRequestCreator.delete(httpApi.USER_IP_LIMIT,true);
export const post=commonRequestCreator.post(httpApi.USER_IP_LIMIT);
export const put=commonRequestCreator.put(httpApi.USER_IP_LIMIT);
