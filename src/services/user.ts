import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const postSign = commonRequestCreator.post(httpApi.USER_SIGN)

export const delSign = commonRequestCreator.delete(httpApi.USER_SIGN)

export const getVerificationCode = commonRequestCreator.get(httpApi.VERIFICATION_CODE)

export const modifyPassword = commonRequestCreator.put(httpApi.USER_PASSWORD)

export const fetchBaseInfo = commonRequestCreator.get(httpApi.BASE_INFO)

export const postAdminHeartBeat = commonRequestCreator.post(httpApi.USER_HEART_BEAT)

export const getTimeConfig = commonRequestCreator.get(httpApi.CONFIG_TIME)