import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
import commonRequestCreator from '../../utils/commonRequestCreator';

const httpApi = ApiConfig.http;

export const get = commonRequestCreator.get(httpApi.SYS_CONFIG_NETWORK);

export const put = commonRequestCreator.put(httpApi.SYS_CONFIG_NETWORK);

export const getSysLogConfig = commonRequestCreator.get(httpApi.SYS_LOG_CONFIG)

export const putSysLogConfig = commonRequestCreator.put(httpApi.SYS_LOG_CONFIG)

export const getControlConfig = commonRequestCreator.get(httpApi.SYS_CONFIG_NETWORK_CONTROL)

export const putControlConfig = commonRequestCreator.put(httpApi.SYS_CONFIG_NETWORK_CONTROL)

export const getAuthNetworkConfig = commonRequestCreator.get(httpApi.AUTH_NETWORK_802)

export const putAuthNetworkConfig = commonRequestCreator.put(httpApi.AUTH_NETWORK_802)