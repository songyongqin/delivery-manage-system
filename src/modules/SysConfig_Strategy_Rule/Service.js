import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
import commonRequestCreator from '../../utils/commonRequestCreator';

const httpApi=ApiConfig.http;

export const get=commonRequestCreator.get(httpApi.SYS_CONFIG_STRATEGY_RULE,true);


export const put=commonRequestCreator.put(httpApi.SYS_CONFIG_STRATEGY_RULE);

export const _delete=commonRequestCreator.delete(httpApi.SYS_CONFIG_STRATEGY_RULE);

export const post=commonRequestCreator.post(httpApi.SYS_CONFIG_STRATEGY_RULE);

export const getThreatname=commonRequestCreator.get(httpApi.SYS_CONFIG_STRATEGY_THREATNAME)
