import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
const httpApi = ApiConfig.http;
import commonRequestCreator from '../../utils/commonRequestCreator';

export const query = commonRequestCreator.get(httpApi.DEVICE_NODE_DISK)

export async function put(payload) {

  const options = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload)
  };
  return request(httpApi.DEVICE_NODE_DISK, options);
}
