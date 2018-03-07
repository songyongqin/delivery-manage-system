import ApiConfig from 'configs/ApiConfig'
import commonRequestCreator from 'utils/commonRequestCreator'

const httpApi = ApiConfig.http
export const postSnortRule = commonRequestCreator.post(httpApi.SNORT)


