import {
  NAMESPACE,
  POST_SNORT_RULE_ACTION,
  FETCH_SNORT_RULE_ACTION
} from './ConstConfig'
import * as services from './services'

export default {
  namespace: NAMESPACE,
  effects: {
    [POST_SNORT_RULE_ACTION]: function* ({ resolve, reject, payload }, { select, put, call }) {
      const res = yield call(services.postSnortRule, payload)

      if (res.status === 1) {
        resolve && resolve()
      }
    },
    [FETCH_SNORT_RULE_ACTION]: function* ({ resolve, reject, payload }, { call, select, put }) {
      const res = yield call(services.getSnortRule, payload)

      if (res.status === 1) {
        resolve && resolve(res.payload)
      }
    }
  }
}