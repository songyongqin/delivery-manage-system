
import { routerRedux } from 'dva/router';
import * as Service from '../Service';
import { NAMESPACE_MALDOMAIN, VALUE_MALDOMAIN } from '../ConstConfig';
import * as tools from 'utils'
export default {
  namespace: NAMESPACE_MALDOMAIN,
  state: {
    data: [],
    loading: false,
    timestampRange: [],
    page: 1,
    limit: 10,
    total: 0,
    lastChangeTime: -1,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const result = yield call(Service.getREPORT_MAL_DOMAIN, payload);
      const data = result.payload.data;
      const total = result.payload.total ? result.payload.total : 0;
      const page = payload.page ? payload.page : 1;
      const timestampRange = payload.timestampRange ? payload.timestampRange : [];
      if (result.status === 1) {
        yield put({
          type: 'save',
          payload: {
            page,
            data,
            total,
            timestampRange
          }
        });
      };

    },
    *onExport({ payload }, { call, put }) {
      const result = yield call(Service.onExport, payload);
      const data = result.payload;
      if (result.status === 1) {
        tools.download(data);
      }
    }
  },
  subscriptions: {

  }
}
