import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http
import isSuccess from 'domainUtils/isSuccess'


export const _fetchStrategySetting = commonRequestCreator.getWithQueryString(httpApi.SYS_CONFIG_STRATEGY)

export const putStrategySetting = commonRequestCreator.put(httpApi.SYS_CONFIG_STRATEGY)

export const applyStrategySetting = commonRequestCreator.post(httpApi.SYS_CONFIG_STRATEGY_APPLY)

export const getThreatName = commonRequestCreator.get(httpApi.SYS_CONFIG_STRATEGY_THREAT_NAME)

export const fetchDate = commonRequestCreator.get(httpApi.SYS_CONFIG_DATA_STRATEGY)

/*
Rule
*/

export const putRule = commonRequestCreator.put(httpApi.SYS_CONFIG_STRATEGY)

export const deleteRule = commonRequestCreator.deleteWithQueryString(httpApi.SYS_CONFIG_STRATEGY)

export const postRule = commonRequestCreator.post(httpApi.SYS_CONFIG_STRATEGY)

/*
  threatName
*/
export const fetchThreatName = commonRequestCreator.get(httpApi.SYS_CONFIG_STRATEGY_THREAT_NAME)

// export const fetchThreatName = _ => {
//   return _fetchThreatName().then(res => {
//     if (isSuccess(res)) {
//       return {
//         ...res,
//         payload: {
//           total: 0,
//           data: res.payload.data
//         }
//       }
//     }
//     return res
//   })
// }


export const putThreatName = commonRequestCreator.put(httpApi.SYS_CONFIG_STRATEGY_THREAT_NAME)

export const postThreatName = commonRequestCreator.post(httpApi.SYS_CONFIG_STRATEGY_THREAT_NAME)

export const deleteThreatName = commonRequestCreator.deleteWithQueryString(httpApi.SYS_CONFIG_STRATEGY_THREAT_NAME)

/**
 * whiteList
 */

export const fetchSnort = commonRequestCreator.getWithQueryString(httpApi.SYS_CONFIG_STRATEGY_SNORT)

// export const fetchWhiteList = _ => {
//   return _fetchWhiteList().then(res => {
//     if (isSuccess(res)) {
//       return {
//         ...res,
//         payload: {
//           total: 0,
//           data: res.payload
//         }
//       }
//     }
//     return res
//   })
// }

export const putSnort = commonRequestCreator.put(httpApi.SYS_CONFIG_STRATEGY_SNORT)

export const postSnort = commonRequestCreator.post(httpApi.SYS_CONFIG_STRATEGY_SNORT)

export const deleteSnort = commonRequestCreator.deleteWithQueryString(httpApi.SYS_CONFIG_STRATEGY_SNORT)

export const applyWhiteList = commonRequestCreator.post(httpApi.SYS_CONFIG_WHITELIST_APPLY)
