/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import * as Service from './Service';
import { queryModelGenerator } from '../../utils/dvaModelGenerator';
import { NAMESPACE } from './ConstConfig';
import * as tools from '../../utils/tools.js';
export default {
  namespace: NAMESPACE,
  state: {
    list: {
      data: []
    },
    page: 1,
    loading: false,
    limit: 50,
    timestampRange: []
  },
  reducers: {
    save(state, { payload: { data: list, page } }) {
      return { ...state, list, page };
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const result = yield call(Service.search, payload);
      const data = result.payload;
      const page = payload.page ? payload.page : 1;
      if (result.status === 1) {
        yield put({
          type: 'save',
          payload: {
            data,
            page,
          }
        });
      }
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
        if (pathname === '/sys-log/login') {
          dispatch({
            type: 'fetch', payload: {
              page: 1,
              limit: 50,
              timestampRange: []

            }
          });
        }
      });
    },
  }
}
