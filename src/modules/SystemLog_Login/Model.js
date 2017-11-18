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
    save(state, { payload: { data: list, page,timestampRange } }) {
      return { ...state, list, page,timestampRange };
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const result = yield call(Service.search, payload);
      const data = result.payload;
      const page = payload.page ? payload.page : 1;
      const timestampRange = payload.timestampRange ? payload.timestampRange : 1;
      
      if (result.status === 1) {
        yield put({
          type: 'save',
          payload: {
            data,
            page,
            timestampRange
          }
        });
      }
    },
    *onExport({ payload }, { callWithExtra, put }) {
      const result = yield callWithExtra(Service.onExport, payload,{withStatusHandle:true});
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
