/**
 * 判断当前环境是否为开发环境
 */
export default () => {
  try {
    return process.env.NODE_ENV === "development"
  } catch (e) {
    return false
  }
}