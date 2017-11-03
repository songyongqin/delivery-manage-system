import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
import commonRequestCreator from '../../utils/commonRequestCreator';
const httpApi = ApiConfig.http;

export async function query(payload) {
  const options = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  };
  return request(httpApi.DEVICE_CONTROL, options);
}



export const postLicence = ({ data }) => {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data || [])
  };
  return request(httpApi.DEVICE_LICENCE, options);
}
