import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchUser = commonRequestCreator.getWithQueryString(httpApi.USER)

export const postUser = commonRequestCreator.post(httpApi.USER)

export const putUser = commonRequestCreator.put(httpApi.USER)

export const delUser = commonRequestCreator.delete(httpApi.USER)

export const patchUser = commonRequestCreator.patch(httpApi.USER)

export const fetchUserConfig = commonRequestCreator.get(httpApi.USER_CONFIG)

export const putUserConfig = commonRequestCreator.put(httpApi.USER_CONFIG)
