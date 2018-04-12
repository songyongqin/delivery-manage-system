import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
import isSuccess from 'domainUtils/isSuccess'
const httpApi = ApiConfig.http

export const fetchVM = commonRequestCreator.getWithQueryString(httpApi.VIRTUAL_MACHINE)

export const postVM = commonRequestCreator.post(httpApi.VIRTUAL_MACHINE)

export const putVM = commonRequestCreator.put(httpApi.VIRTUAL_MACHINE)

export const deleteVM = commonRequestCreator.deleteWithQueryString(httpApi.VIRTUAL_MACHINE)

export const fetchVMOption = commonRequestCreator.get(httpApi.VM_OPTION)

export const validate = commonRequestCreator.get(httpApi.VALIDATE)

export const fetchVMCreateStatus = commonRequestCreator.getWithQueryString(httpApi.CREATE_STATUS)