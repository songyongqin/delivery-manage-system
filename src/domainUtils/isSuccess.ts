const STATUS_DATA_INDEX = "status",
  COMMON_SUCCESS_STATUS = 1
/**
 * 判断业务相关的http请求是否为成功 ，status为1则请求成功
 */
export default (res: object) => {
  try {
    return res[STATUS_DATA_INDEX] === COMMON_SUCCESS_STATUS
  } catch (e) {
    console.error(e)
    return false
  }
}