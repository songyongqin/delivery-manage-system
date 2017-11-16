import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
import commonRequestCreator from 'utils/commonRequestCreator';
const httpApi=ApiConfig.http;

export const query = commonRequestCreator.get(httpApi.ANALYSE_EVENT_TOOL,true)

export const post=commonRequestCreator.post(httpApi.ANALYSE_EVENT_TOOL);
