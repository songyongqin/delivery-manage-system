
import { NAMESPACE, NAMESPACE_URL, FETCH_FILE_REPORT_ACTION } from '../ConstConfig'
import { DvaModel } from 'interfaces/index'
import * as Services from '../Services'
import moment from 'moment'

const model: DvaModel<any> = {

  namespace: NAMESPACE_URL,

  state: {
    data: [],
    loading: false,
    timestampRange: [],
    page: 1,
    limit: 30,
    total: 0,
    md5: "",
    url: "",
    judge: [],
    threatType: [],
    lastChangeTime: -1
  },

  subscriptions: {},

  effects: {
    * fetch({ payload }, { select, call, put }) {
      const url = yield select(state => state[NAMESPACE_URL].url);
      const md5 = yield select(state => state[NAMESPACE_URL].md5);
      const judge = yield select(state => state[NAMESPACE_URL].judge);
      const threatType = yield select(state => state[NAMESPACE_URL].threatType);
      const timestampRange = yield select(state => state[NAMESPACE].timestampRange);
      const limit = yield select(state => state[NAMESPACE_URL].limit);
      const page = payload.page ? payload.page : 1;
      const addPayload = {
        url, md5, judge, threatType, timestampRange, limit, page
      };

      const result = yield call(Services.get_url, addPayload);
      const data = result.payload.data;
      const total = result.payload.total ? result.payload.total : yield select(state => state[NAMESPACE_URL].total);
      if (result.status === 1) {
        yield put({
          type: 'save',
          payload:
            {
              ...addPayload,
              total,
              limit,
              data,
            }
        });
      };
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};


export default model;