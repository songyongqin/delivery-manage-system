import isSuccess from 'domainUtils/isSuccess'
import { delay } from 'utils'

export default (service, delayTime = 0) =>
  [
    function* ({ resolve, reject, payload }, { call }) {
      const res = yield call(service, payload)

      yield delay(delayTime)

      if (isSuccess(res)) {
        resolve && resolve(res.payload)
      }
      else {
        reject && reject(res.message)
      }
    },
    {
      type: "takeLatest"
    }
  ]