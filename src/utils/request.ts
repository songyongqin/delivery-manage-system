import fetch from 'dva/fetch'
import setUrl from './setUrl'


interface CombineError extends Error {
  status?: number
}

interface BeforeRequest {
  (url: string, options?: object): object
}

interface AfterRequest {
  (url: string, options: object, res: any): any
}

interface Final {
  (url: string, options: object, result: any): void
}

interface OnError {
  (error: CombineError): object
}

interface CreateRequestHandleParams {
  beforeRequest?: BeforeRequest,
  afterRequest?: AfterRequest,
  final?: Final,
  onError?: OnError
}

interface CreateRequestHandle {
  (params?: CreateRequestHandleParams): Request
}

interface Request {
  (url: string, options: object): Promise<Object>
}
/**
 * 
 * 将返回的 response 对象转换为 json
 */
function parseJSON(response) {
  return response.json()
}
/**
 * 检查请求响应是否为错误
 */
function checkStatus(response) {

  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error: CombineError = new Error(response.statusText)
  error.status = response.status
  throw error
}

const defaultOnError = error => {
  throw error
}

export const createRequestHandle: CreateRequestHandle = ({ beforeRequest, afterRequest, final, onError } = {}) => {

  if (beforeRequest !== undefined && beforeRequest !== null && !(beforeRequest instanceof Function)) {
    throw new Error("createRequestHandle: beforeRequest should instanceof Function")
  }

  if (afterRequest !== undefined && afterRequest !== null && !(afterRequest instanceof Function)) {
    throw new Error("createRequestHandle: afterRequest should instanceof Function")
  }

  if (final !== undefined && final !== null && !(final instanceof Function)) {
    throw new Error("createRequestHandle: final should instanceof Function")
  }

  if (onError !== undefined && final !== null && !(final instanceof Function)) {
    throw new Error("createRequestHandle: onError should instanceof Function")
  }

  // return (url: string, options?: object) => {
  //   //请求前options处理 ，beforeRequest 内可附带token信息或加密等操作
  //   const finalOptions = beforeRequest ? beforeRequest(url, options) : options
    
  //   return fetch(url, finalOptions)
  //     //检测返回的状态
  //     .then(checkStatus)
  //     //
  //     .then(res => afterRequest ? afterRequest(url, finalOptions, res) : res.json())
  //     //
  //     .catch(error => onError ? onError(error) : defaultOnError(error))
  //     //
  //     .then(result => {
  //       final && final(url, finalOptions, result)
  //       return result
  //     })
  // }

  return (url: string, options?: object) => {
    //请求前options处理 ，beforeRequest 内可附带token信息或加密等操作
    let urls = setUrl(url)
    const finalOptions = beforeRequest ? beforeRequest(urls, options) : options
    
    return fetch(urls, finalOptions)
      //检测返回的状态
      .then(checkStatus)
      //
      .then(res => afterRequest ? afterRequest(urls, finalOptions, res) : res.json())
      //
      .catch(error => onError ? onError(error) : defaultOnError(error))
      //
      .then(result => {
        final && final(urls, finalOptions, result)
        return result
      })
  }
}

export default createRequestHandle()