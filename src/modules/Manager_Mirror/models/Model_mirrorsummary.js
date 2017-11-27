
import { routerRedux } from 'dva/router';
import * as Service from '../Service';
import { queryModelGenerator } from '../../../utils/dvaModelGenerator';
import { NAMESPACE } from '../ConstConfig';
import * as tools from '../../../utils/tools.js';
export default {
  namespace: NAMESPACE,
  state: {
    data: [],
    loading: false,
    page: 1,
    limit: 10,
    total: 0,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const result = yield call(Service.getMIRROR_SUMMARY, payload);
      const data = result.payload.data;
      const page = payload.page ? payload.page : 1;
      const total = result.payload.total ? result.payload.total : 0;
      if (result.status === 1) {
        yield put({
          type: 'save',
          payload: {
            page,
            data,
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
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/manager/mirror') {
          dispatch({
            type: 'fetch',
            payload: {
              page: 1,
              limit: 50,
              total: 10
            }
          });
        }
      });
    },
  }
}
