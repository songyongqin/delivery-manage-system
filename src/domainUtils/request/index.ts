import { createRequestHandle } from 'utils/request'
import beforeRequest from './beforeRequest'
import afterRequest from './afterRequest'
import final from './final'
import onError from './onError'

export default createRequestHandle({
  beforeRequest,
  afterRequest,
  onError,
  final
})