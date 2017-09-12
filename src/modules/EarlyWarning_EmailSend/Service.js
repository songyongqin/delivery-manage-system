import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
const httpApi=ApiConfig.http;

export async function query() {


  const options= {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  };
  return request(httpApi.WARNING_EMAIL_CONFIG, options);
}


export async function put(payload) {

  const options= {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body:JSON.stringify(payload)
  };

  return request(httpApi.WARNING_EMAIL_CONFIG, options);
}
