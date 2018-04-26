import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const postSnortRule = commonRequestCreator.post(httpApi.SNORT)

export const getSnortRule = commonRequestCreator.get(httpApi.SNORT)

