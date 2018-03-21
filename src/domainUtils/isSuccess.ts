const STATUS_DATA_INDEX = "status",
  COMMON_SUCCESS_STATUS = 1

export default (res: object) => {
  try {
    return res[STATUS_DATA_INDEX] === COMMON_SUCCESS_STATUS
  } catch (e) {
    console.error(e)
    return false
  }
}