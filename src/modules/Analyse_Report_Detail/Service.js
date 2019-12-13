// import request from '../../utils/request';
// import * as tools from '../../utils/tools';
// import ApiConfig from 'services/apiConfig'


// export async function queryDetail(payload) {
//   /*
//    * 转换参数格式
//    * */
//   // let {timestampRange,token}=payload;

//   payload = {
//     keyword: payload.keyword
//   };

//   const options = {
//     method: 'GET',
//     headers: {
//       "Content-Type": "application/json; charset=utf-8",
//       // "access-token":token,
//     }
//   };
//   return request(ApiConfig.queryDetail + tools.jsonToQueryString(payload), options);
// }


import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'

const httpApi = ApiConfig.http;
export const queryDetail = commonRequestCreator.getWithQueryString(httpApi.queryDetail);

