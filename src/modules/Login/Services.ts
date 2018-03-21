import commonRequestCreator from 'utils/commonRequestCreator'
import ApiConfig from 'configs/ApiConfig'
const httpApi = ApiConfig.http

export const postSign = commonRequestCreator.post(httpApi.USER_SIGN)

export const delSign = commonRequestCreator.delete(httpApi.USER_SIGN)

export const getVerificationCode = commonRequestCreator.get(httpApi.USER_VERIFICATION_CODE)

export const modifyPassword = commonRequestCreator.put(httpApi.USER_PASSWORD)