import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchTable = commonRequestCreator.getWithQueryString(httpApi.PROJECT_TABLE)
export const addProject = commonRequestCreator.post(httpApi.PROJECT_ADD)
export const changeState = commonRequestCreator.put(httpApi.PROJECT_STATE_CHANGE)




