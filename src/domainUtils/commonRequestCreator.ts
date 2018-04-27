/*
 该文件内容为所有业务相关的普通HTTP请求方法
*/
import request from 'domainUtils/request'
import domainQueryStringParse from 'domainUtils/queryStringParse'

const commonHeader = {
  "Content-Type": "application/json; charset=utf-8",
}
export default {
  get: (url: string) => (payload: object = {}): Promise<any> => request(url + domainQueryStringParse({
    "request-id": new Date().getTime()
  }), {
      method: "GET",
      headers: commonHeader
    }),
  //需要携带queryString的get请求
  getWithQueryString: (url: string) => (payload: object = {}): Promise<any> => request(url + domainQueryStringParse({
    ...payload,
    "request-id": new Date().getTime()
  }), {
      method: "GET",
      headers: commonHeader
    }),

  delete: (url: string) => (payload: object = {}): Promise<any> => request(url, {
    method: "DELETE",
    headers: commonHeader
  }),
  //需要携带queryString的delete请求
  deleteWithQueryString: (url: string) => (payload: object = {}): Promise<any> => request(url + domainQueryStringParse(payload), {
    method: "DELETE",
    headers: commonHeader
  }),

  post: (url: string) => (payload: object = {}): Promise<any> => request(url, {
    method: "POST",
    headers: commonHeader,
    body: JSON.stringify(payload || {})
  }),

  put: (url: string) => (payload: object = {}): Promise<any> => request(url, {
    method: "PUT",
    headers: commonHeader,
    body: JSON.stringify(payload || {})
  }),

  patch: (url: string) => (payload: object = {}): Promise<any> => request(url, {
    method: "PATCH",
    headers: commonHeader,
    body: JSON.stringify(payload || {})
  }),
}