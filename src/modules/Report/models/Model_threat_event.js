
import { routerRedux } from 'dva/router';
import * as Service from '../Service';
import { queryModelGenerator } from '../../../utils/dvaModelGenerator';
import { NAMESPACE_THREATEVENT } from '../ConstConfig';
import * as tools from '../../../utils/tools.js';
export default {
  namespace: NAMESPACE_THREATEVENT,
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
      const result = yield call(Service.getthreatevent, payload);
      const data = result.payload.data;
      const timestampRange = payload.timestampRange ? payload.timestampRange : [];
      const page = payload.page ? payload.page : 1;
      const total = result.payload.total ? result.payload.total : 0;
      if (result.status === 1) {
        yield put({
          type: 'save',
          payload: {
            page,
            data,
            timestampRange,
            total
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
