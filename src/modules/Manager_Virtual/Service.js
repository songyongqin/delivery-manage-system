import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
const httpApi=ApiConfig.http;

export async function query(payload) {

  const options= {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  };
  return request(httpApi.VIRTUAL_MACHINE+tools.jsonToQueryStringImprove(payload), options);
}

export async function getNodeIpList() {

  const options= {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  };
  return request(httpApi.OCCUPYING_NODE_IP, options);
}

export async function getVMIpList(payload) {

  const options= {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  };
  return request(httpApi.OCCUPYING_VM_IP+tools.jsonToQueryStringImprove(payload), options);
}
