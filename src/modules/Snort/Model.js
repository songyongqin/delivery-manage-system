import {
  NAMESPACE,
  POST_SNORT_RULE_ACTION
} from './ConstConfig'
import * as services from './Service.js'
import { commonCallConfig } from '../../configs/ExtraEffectsOptions'

export default {
  namespace: NAMESPACE,
  effects: {
    [POST_SNORT_RULE_ACTION]: function* ({ resolve, reject, payload }, { callWithExtra, select, put }) {
      const res = yield callWithExtra(services.postSnortRule, payload, commonCallConfig)

      if (res.status === 1) {
        resolve && resolve()
      }
    }
  }
}