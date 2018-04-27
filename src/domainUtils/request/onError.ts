/**
 * 请求结果异常 ，将异常结果进行转换
 */
export default (err) => {
  return { status: err.status || -99999, message: err.message }
}