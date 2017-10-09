import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
import commonRequestCreator from '../../utils/commonRequestCreator';

const httpApi=ApiConfig.http;

export const get=commonRequestCreator.get(httpApi.SYS_CONFIG_STRATEGY);

export const put=commonRequestCreator.put(httpApi.SYS_CONFIG_STRATEGY);
