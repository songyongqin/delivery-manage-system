import isSuccess from 'domainUtils/isSuccess'

export default service =>
  function* ({ resolve, reject, payload }, { call }) {
    const res = yield call(service, payload)
    if (isSuccess(res)) {
      resolve && resolve(res.payload)
    }
    else {
      reject && reject(res.message)
    }
  }