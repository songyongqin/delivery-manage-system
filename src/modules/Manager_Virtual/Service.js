import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
const httpApi = ApiConfig.http;

import commonRequestCreator from '../../utils/commonRequestCreator';


export const postVM = commonRequestCreator.post(httpApi.VIRTUAL_MACHINE);

export const deleteVM = commonRequestCreator.delete(httpApi.VIRTUAL_MACHINE, true);

export const putVM = commonRequestCreator.put(httpApi.VIRTUAL_MACHINE);

export const getVMOption = commonRequestCreator.get(httpApi.VM_OPTION)

export const getStatus = commonRequestCreator.get(httpApi.CREATE_STATUS);


export async function query(payload) {

  const options = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  };
  return request(httpApi.VIRTUAL_MACHINE + tools.jsonToQueryString(payload), options);
}

export async function getNodeIpList() {

  const options = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  };
  return request(httpApi.OCCUPYING_NODE_IP, options);
}

export async function getVMIpList(payload) {

  const options = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  };
  return request(httpApi.OCCUPYING_VM_IP + tools.jsonToQueryString(payload), options);
}


export async function getVMNameList() {

  const options = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  };
  return request(httpApi.OCCUPYING_VM_NAME, options);
}


export async function validate(payload) {
  const options = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  };
  return request(httpApi.VALIDATE + tools.jsonToQueryString(payload), options);
}