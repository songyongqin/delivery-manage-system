/**
 * Created by jojo on 2017/9/30.
 */

import request from './request';
import * as tools from './tools';

const commonHeader={
  "Content-Type": "application/json; charset=utf-8",
}

export default {

  get:(url)=>async ()=>request(url, {
    method: 'GET',
    headers: commonHeader
  }),

  post:(url,body)=>async payload=>request(url, {
    method: 'POST',
    headers: commonHeader,
    body:JSON.stringify(payload||{})
  }),

  put:(url,body)=>async payload=>request(url, {
    method: 'PUT',
    headers: commonHeader,
    body:JSON.stringify(payload||{})
  }),


  delete:(url)=>async ()=>request(url, {
    method:"delete",
    headers: commonHeader,
  })
}
