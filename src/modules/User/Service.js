import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
const httpApi=ApiConfig.http;

export async function postSign(payload) {
  /*
   * 转换参数格式
   * */


  payload={
    userAccount:payload.userAccount,
    userPassword:payload.userPassword,
  };



  const options= {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body:JSON.stringify(payload)
  };
  return request(httpApi.USER_SIGN, options);
}


export async function putPassowrd(payload) {

  const options= {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body:JSON.stringify(payload)
  };
  return request(httpApi.USER_PASSWORD, options);
}


export async function getProductType(payload) {
  const options= {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  return request(httpApi.PRODUCT_TYPE, options);
}
