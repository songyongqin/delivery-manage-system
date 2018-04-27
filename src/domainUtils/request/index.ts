import { createRequestHandle } from 'utils/request'
import beforeRequest from './beforeRequest'
import afterRequest from './afterRequest'
import final from './final'
import onError from './onError'
/**
 * 该模块暴露的方法为 http 业务直接相关请求的 request 的方法
 * 具体的行为 请查看 beforeRequest ,afterRequest , onError ,final
 */
export default createRequestHandle({
  beforeRequest,
  afterRequest,
  onError,
  final
})