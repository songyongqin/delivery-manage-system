import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http



export const getWhiteList = commonRequestCreator.getWithQueryString(httpApi.WHITE_LIST)

export const postWhiteList = commonRequestCreator.post(httpApi.WHITE_LIST)

export const delWhiteList = commonRequestCreator.deleteWithQueryString(httpApi.WHITE_LIST)

export const postWhiteListUse = commonRequestCreator.post(httpApi.WHITE_LIST_USE)

