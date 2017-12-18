/**
 * Created by jojo on 2017/9/30.
 */

import request from './request';
import * as tools from './tools';

const commonHeader = {
  "Content-Type": "application/json; charset=utf-8",
}

export default {

  get: (url, withQuery = false) => payload => request(url + tools.jsonToQueryString(payload), {
    method: 'GET',
    headers: commonHeader
  }),

  post: (url, body) => payload => request(url, {
    method: 'POST',
    headers: commonHeader,
    body: JSON.stringify(payload || {})
  }),

  put: (url, body) => payload => request(url, {
    method: 'PUT',
    headers: commonHeader,
    body: JSON.stringify(payload || {})
  }),


  delete: (url, withQuery = false) => payload => request(url + tools.jsonToQueryString(payload), {
    method: "DELETE",
    headers: commonHeader,
  }),

  patch: (url) => payload => request(url, {
    method: 'PATCH',
    headers: commonHeader,
    body: JSON.stringify(payload || {})
  }),
}
