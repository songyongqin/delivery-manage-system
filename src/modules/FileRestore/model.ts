import {
  NAMESPACE,
} from './constants'
import * as services from './services'

export default {
  namespace: NAMESPACE,
  effects: {
    "fetch": function* ({ resolve, reject, payload }, { call, select, put }) {
      const res = yield call(services.fetch, payload)
      console.info(res)
      if (res.status === 1) {
        resolve && resolve(res.payload)
      }
    },
  }
}