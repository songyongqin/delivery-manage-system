import { SYS_CONFIG_STRATEGY_THREAT_NAME } from 'constants/model'
import { fetchThreatName, postThreatName, putThreatName, deleteThreatName } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: SYS_CONFIG_STRATEGY_THREAT_NAME,
  state: {
    threatNameList: []
  },
  reducers: {
    saveThreatNameList: (preState, { payload }) => {
      return {
        ...preState,
        threatNameList: payload
      }
    }
  },
  effects: {
    fetch: commonEffectCreator(fetchThreatName),
    put: commonEffectCreator(putThreatName, 500),
    post: commonEffectCreator(postThreatName, 500),
    delete: commonEffectCreator(deleteThreatName, 500)
  }
}