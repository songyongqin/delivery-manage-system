import { AUDIT_EVENT_NAMESPACE } from 'constants/model'
import { fetchAuditEvent } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'
import { getWeekTime, getTodayTime } from 'utils/getInitTime'

export default {
  namespace: AUDIT_EVENT_NAMESPACE,
  state: {
    initialFilters: {
      timestampRange: getTodayTime()||[],
      page: 1,
      threatJudge: [],
      url: "",
      sourceIP: "",
      sourcePort: "",
      requestDomain: "",
      sender: "",
      receiver: "",
      value: "",
      protocolType: "HTTP",
      limit: 10
    },
    initial: {
      timestampRange: getTodayTime()||[],
      page: 1,
      threatJudge: [],
      url: "",
      sourceIP: "",
      sourcePort: "",
      requestDomain: "",
      sender: "",
      receiver: "",
      value: "",
      protocolType: "HTTP",
      limit: 10
    },
  },
  effects: {
    // fetch: commonEffectCreator(fetchAuditEvent)
    fetch: function* ({ resolve, reject, payload }, { call, put }) {
      const res = yield call(fetchAuditEvent, payload)

      if (res.status == 1) {
        yield put({
          type: "save",
          payload
        });
        resolve && resolve(res.payload)
      }
      else {
        reject && reject(res.message)
      }
    },
  },
  reducers: {
    save: (preState, { payload }) => {

      return {
        ...preState,
        initialFilters: {
          ...preState.initialFilters,
          ...payload
        }
      }
    },
  }
}