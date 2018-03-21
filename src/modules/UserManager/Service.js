import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
import commonRequestCreator from '../../utils/commonRequestCreator';

const httpApi=ApiConfig.http;

export async function query(payload) {
  /*
   * 转换参数格式
   * */

  const options= {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  };
  return request(httpApi.USER+tools.jsonToQueryStringImprove(payload), options);
}


export async function getUserConfig() {
  /*
   * 转换参数格式
   * */
  const options= {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  };
  return request(httpApi.USER_CONFIG, options);
}


export async function putUserConfig(payload) {
  /*
   * 转换参数格式
   * */

  const options= {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body:JSON.stringify(payload)
  };
  return request(httpApi.USER_CONFIG, options);
}


export async function putUser(payload) {
  /*
   * 转换参数格式
   * */
  const options= {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body:JSON.stringify(payload)
  };
  return request(httpApi.USER, options);
}

export async function postUser(payload) {
  /*
   * 转换参数格式
   * */

  const options= {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body:JSON.stringify(payload)
  };
  return request(httpApi.USER, options);
}

export const _delete=commonRequestCreator.delete(httpApi.USER);

export const patch=commonRequestCreator.patch(httpApi.USER)
