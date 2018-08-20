import request from './request';
import domainQueryStringParse from 'utils/domainQueryStringParse'
const commonHeader = {
  "Content-Type": "application/json; charset=utf-8",
}

export default {
  get: (url: string) => (payload: object = {}): Promise<any> =>
    request(url + domainQueryStringParse({ "request-id": new Date().getTime() }), {
      method: "GET",
      headers: commonHeader
    }),
  getWithQueryString: (url: string) => (payload: object = {}): Promise<any> =>
    request(url + domainQueryStringParse({
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