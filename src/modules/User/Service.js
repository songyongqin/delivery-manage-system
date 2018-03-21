import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
import commonRequestCreator from '../../utils/commonRequestCreator'
const httpApi = ApiConfig.http;

export const getVerificationCode = commonRequestCreator.get(httpApi.VERIFICATION_CODE)

export const postSign = commonRequestCreator.post(httpApi.USER_SIGN)

export async function putPassowrd(payload) {

  const options = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload)
  };
  return request(httpApi.USER_PASSWORD, options);
}

export const getProductType = commonRequestCreator.get(httpApi.PRODUCT_TYPE)

export const deleteSign = commonRequestCreator.delete(httpApi.USER_SIGN)

export const postUserActive = commonRequestCreator.post(httpApi.USER_ACTIVE)

export const postAdminHeartBeat = commonRequestCreator.post(httpApi.USER_HEART_BEAT)
