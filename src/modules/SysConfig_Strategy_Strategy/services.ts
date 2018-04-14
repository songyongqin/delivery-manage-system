

import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http


export const get = commonRequestCreator.get(httpApi.SYS_CONFIG_STRATEGY);

export const put = commonRequestCreator.put(httpApi.SYS_CONFIG_STRATEGY);

export const apply = commonRequestCreator.post(httpApi.SYS_CONFIG_STRATEGY_APPLY);

export const getThreatname = commonRequestCreator.get(httpApi.SYS_CONFIG_STRATEGY_THREAT_NAME)
