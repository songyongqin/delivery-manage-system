
import { routerRedux } from 'dva/router';
import * as Service from '../Service';
import { queryModelGenerator } from '../../../utils/dvaModelGenerator';
import { NAMESPACE_SUMMARY } from '../ConstConfig';
import * as tools from '../../../utils/tools.js';
export default {
  namespace: NAMESPACE_SUMMARY,
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
    *fetch({ payload }, { callWithExtra, put }) {
      const result = yield callWithExtra(Service.getMIRROR_SUMMARY, payload, { withStatusHandle: true });
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
