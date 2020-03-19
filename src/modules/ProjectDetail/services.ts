import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchTable = commonRequestCreator.getWithQueryString(httpApi.PROJECT_DETAIL_TABLE)
export const updateProjectDetail = commonRequestCreator.put(httpApi.PROJECT_DETAIL_TABLE)
export const addRecord = commonRequestCreator.post(httpApi.PROJECT_DETAIL_RECORD)
export const updRecord = commonRequestCreator.put(httpApi.PROJECT_DETAIL_RECORD)
export const updProduct = commonRequestCreator.put(httpApi.PROJECT_UPDATE_PRODUCT)
export const addProduct = commonRequestCreator.post(httpApi.PROJECT_ADD_PRODUCT)
export const delProduct = commonRequestCreator.deleteWithQueryString(httpApi.PROJECT_DEL_PRODUCT)









