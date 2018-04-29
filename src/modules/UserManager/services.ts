import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http
import {
  OPEN_DATAINDEX,
  ROLE_DATAINDEX,
  ADMIN_LIMIT_DATAINDEX,
  IPLIMIT_DATAINDEX,
  COMMON_LIMIT_DATAINDEX,
  IP_RANGE_DATAINDEX,
} from './constants'

export const fetchUser = commonRequestCreator.getWithQueryString(httpApi.USER)

export const postUser = commonRequestCreator.post(httpApi.USER)

export const putUser = commonRequestCreator.put(httpApi.USER)

export const delUser = commonRequestCreator.deleteWithQueryString(httpApi.USER)

export const patchUser = commonRequestCreator.patch(httpApi.USER)

export const fetchUserConfig = commonRequestCreator.get(httpApi.USER_CONFIG)

export const putUserConfig = commonRequestCreator.put(httpApi.USER_CONFIG)

const _fetchIPLimitConfig = commonRequestCreator.get(httpApi.USER_IP_LIMIT)

export const fetchIPLimitConfig = _ => {
  return _fetchIPLimitConfig().then(res => {
    try {
      return {
        ...res,
        payload: {
          total: 0,
          [OPEN_DATAINDEX]: res.payload[OPEN_DATAINDEX],
          data: [
            {
              [ROLE_DATAINDEX]: ADMIN_LIMIT_DATAINDEX,
              [IP_RANGE_DATAINDEX]: res.payload[IPLIMIT_DATAINDEX][ADMIN_LIMIT_DATAINDEX]
            },
            {
              [ROLE_DATAINDEX]: COMMON_LIMIT_DATAINDEX,
              [IP_RANGE_DATAINDEX]: res.payload[IPLIMIT_DATAINDEX][COMMON_LIMIT_DATAINDEX]
            }
          ]
        }
      }
    } catch (e) {
      console.error(e)
      return {
        status: 1,
        payload: {
          total: 0,
          data: []
        }
      }
    }
  })
}

export const deleteIPLimitConfig = commonRequestCreator.deleteWithQueryString(httpApi.USER_IP_LIMIT)

export const postIPLimitConfig = commonRequestCreator.post(httpApi.USER_IP_LIMIT)

export const putIPLimitConfig = commonRequestCreator.put(httpApi.USER_IP_LIMIT)