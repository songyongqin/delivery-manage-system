import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
const httpApi = ApiConfig.http;
import secretKey from 'configs/SecretKey'


import commonRequestCreator from '../../utils/commonRequestCreator';


export const postVM = commonRequestCreator.post(httpApi.VIRTUAL_MACHINE);

export const deleteVM = commonRequestCreator.delete(httpApi.VIRTUAL_MACHINE, true);

export const putVM = commonRequestCreator.put(httpApi.VIRTUAL_MACHINE);

export const getVMOption = commonRequestCreator.get(httpApi.VM_OPTION)

export const getStatus = commonRequestCreator.get(httpApi.CREATE_STATUS);

export const query = commonRequestCreator.get(httpApi.VIRTUAL_MACHINE);

export const getNodeIpList = commonRequestCreator.get(httpApi.OCCUPYING_NODE_IP)

export const getVMIpList = commonRequestCreator.get(httpApi.OCCUPYING_VM_IP)

export const getVMNameList = commonRequestCreator.get(httpApi.OCCUPYING_VM_NAME)

export const validate = commonRequestCreator.get(httpApi.VALIDATE)
