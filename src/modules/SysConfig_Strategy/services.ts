import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http
import isSuccess from 'domainUtils/isSuccess'


const _fetchStrategySetting = commonRequestCreator.get(httpApi.SYS_CONFIG_STRATEGY)

export const fetchStrategySetting = _ => {
  return _fetchStrategySetting().then(res => {
    if (isSuccess(res)) {
      return {
        ...res,
        payload: {
          total: 0,
          data: res.payload
        }
      }
    }
    return res
  })
}

export const putStrategySetting = commonRequestCreator.put(httpApi.SYS_CONFIG_STRATEGY)

export const applyStrategySetting = commonRequestCreator.post(httpApi.SYS_CONFIG_STRATEGY_APPLY)

export const getThreatName = commonRequestCreator.get(httpApi.SYS_CONFIG_STRATEGY_THREAT_NAME)

/*
Rule
*/
export const fetchRule = commonRequestCreator.getWithQueryString(httpApi.SYS_CONFIG_STRATEGY_RULE)

export const putRule = commonRequestCreator.put(httpApi.SYS_CONFIG_STRATEGY_RULE)

export const deleteRule = commonRequestCreator.deleteWithQueryString(httpApi.SYS_CONFIG_STRATEGY_RULE)

export const postRule = commonRequestCreator.post(httpApi.SYS_CONFIG_STRATEGY_RULE)

/*
  threatName
*/
const _fetchThreatName = commonRequestCreator.get(httpApi.SYS_CONFIG_STRATEGY_THREAT_NAME)

export const fetchThreatName = _ => {
  return _fetchThreatName().then(res => {
    if (isSuccess(res)) {
      return {
        ...res,
        payload: {
          total: 0,
          data: res.payload
        }
      }
    }
    return res
  })
}


export const putThreatName = commonRequestCreator.put(httpApi.SYS_CONFIG_STRATEGY_THREAT_NAME)

export const postThreatName = commonRequestCreator.post(httpApi.SYS_CONFIG_STRATEGY_THREAT_NAME)

export const deleteThreatName = commonRequestCreator.deleteWithQueryString(httpApi.SYS_CONFIG_STRATEGY_THREAT_NAME)

/**
 * whiteList
 */

const _fetchWhiteList = commonRequestCreator.get(httpApi.SYS_CONFIG_STRATEGY_WHITELIST)

export const fetchWhiteList = _ => {
  return _fetchWhiteList().then(res => {
    if (isSuccess(res)) {
      return {
        ...res,
        payload: {
          total: 0,
          data: res.payload
        }
      }
    }
    return res
  })
}

export const putWhiteList = commonRequestCreator.put(httpApi.SYS_CONFIG_STRATEGY_WHITELIST)

export const postWhiteList = commonRequestCreator.post(httpApi.SYS_CONFIG_STRATEGY_WHITELIST)

export const deleteWhiteList = commonRequestCreator.deleteWithQueryString(httpApi.SYS_CONFIG_STRATEGY_WHITELIST)

export const applyWhiteList = commonRequestCreator.post(httpApi.SYS_CONFIG_WHITELIST_APPLY)
