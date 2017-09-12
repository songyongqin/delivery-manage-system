import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
const httpApi=ApiConfig.http;

export async function query() {

  const options= {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  };
  return request(httpApi.DEVICE_CONTROL_DISK, options);
}

export async function put(payload) {

  const options= {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body:JSON.stringify(payload)
  };
  return request(httpApi.DEVICE_CONTROL_DISK, options);
}
