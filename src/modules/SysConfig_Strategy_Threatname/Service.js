import ApiConfig from '../../configs/ApiConfig';
import commonRequestCreator from '../../utils/commonRequestCreator';

const httpApi=ApiConfig.http;

export const get=commonRequestCreator.get(httpApi.SYS_CONFIG_STRATEGY_THREATNAME);

export const put=commonRequestCreator.put(httpApi.SYS_CONFIG_STRATEGY_THREATNAME);

export const post=commonRequestCreator.post(httpApi.SYS_CONFIG_STRATEGY_THREATNAME);

export const _delete=commonRequestCreator.delete(httpApi.SYS_CONFIG_STRATEGY_THREATNAME);

