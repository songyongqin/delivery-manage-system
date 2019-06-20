import { AUDIT_EVENT_NAMESPACE } from 'constants/model'
import { fetchAuditEvent, postAuditEvent } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'
import { download }from 'utils/download'

export default {
  namespace: AUDIT_EVENT_NAMESPACE,
  state: {
    initialFilters: {
      timestampRange: [],
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
      timestampRange: [],
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
    post: function* ({ resolve, reject, payload }, {select, call, put }){
      const res = yield call(postAuditEvent, payload)
      if(res.status===1){
        const { url, fileName } = res.payload
        download(url, fileName)
        resolve&& resolve()
      }
      reject&&reject()
    }
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