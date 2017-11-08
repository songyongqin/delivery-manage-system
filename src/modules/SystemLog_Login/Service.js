import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
import commonRequestCreator from '../../utils/commonRequestCreator';
import request from '../../utils/request';

const httpApi = ApiConfig.http;

export const get = payload => {

  const options = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  };
  return request(httpApi.ANALYSE_EVENT + tools.jsonToQueryString(payload), options);
};

