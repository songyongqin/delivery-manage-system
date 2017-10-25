import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';

import commonRequestCreator from '../../utils/commonRequestCreator';

const httpApi = ApiConfig.http;


export const getSetting = commonRequestCreator.get(httpApi.MODULE_MONITOR)

export const putSetting = commonRequestCreator.put(httpApi.MODULE_MONITOR)

export const getLog = commonRequestCreator.get(httpApi.MODULE_MONITOR_LOG)
