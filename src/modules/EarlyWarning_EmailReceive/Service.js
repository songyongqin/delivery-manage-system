import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
import commonRequestCreator from 'utils/commonRequestCreator'
const httpApi = ApiConfig.http;

export const query = commonRequestCreator.get(httpApi.WARNING_EMAIL)

export async function put(payload) {


  const options = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload)
  };
  return request(httpApi.WARNING_EMAIL, options);
}
