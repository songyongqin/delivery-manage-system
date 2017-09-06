import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
const httpApi=ApiConfig.http;

export async function query(payload) {
  /*
   * 转换参数格式
   * */
  let {timestampRange,value}=payload;

  payload={
    ...payload,
  };

  if(timestampRange.length!==0){
    payload.timestampRange=tools.momentToTimestamp(timestampRange)
  }

  if(value===null||value.trim().length===0){
    delete payload.value;
  }

  const options= {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  };

  return request(httpApi.ANALYSE_EVENT_TOOL+tools.jsonToQueryStringImprove(payload), options);
}




export async function post(payload) {

  let {timestampRange}=payload;

  payload={};

  if(timestampRange.length!==0){
    payload.timestampRange=tools.momentToTimestamp(timestampRange)
  }

  const options= {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body:JSON.stringify(payload,null,4)
  };
  return request(httpApi.ANALYSE_EVENT_TOOL, options);
}
