
import { routerRedux } from 'dva/router';
import * as Service from './Service';
import { queryModelGenerator } from '../../utils/dvaModelGenerator';
import { NAMESPACE } from './ConstConfig';
import * as tools from '../../utils/tools.js';
export default {
  namespace: NAMESPACE,
  state: {
    list: [],
    page: 1,
    loading: false,
    limit: 50,
    timestampRange: [],
    ip: "",
    userAccount: "",
    loginStatus: "",
    total: 500
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetch({ payload }, { callWithExtra, put }) {
      const result = yield callWithExtra(Service.search, payload, { withStatusHandle: true });
      const list = result.payload.data;
      const total = result.payload.total ? result.payload.total : 500;
      const page = payload.page ? payload.page : 1;
      const timestampRange = payload.timestampRange ? payload.timestampRange : 1;
      const ip = payload.ip ? payload.ip : "";
      const userAccount = payload.userAccount ? payload.userAccount : "";
      const loginStatus = payload.loginStatus ? payload.loginStatus : "";
      if (result.status === 1) {
        yield put({
          type: 'save',
          payload: {
            list,
            page,
            timestampRange,
            userAccount,
            ip,
            loginStatus,
            total
          }
        });
      }
    },
    *onExport({ payload }, { callWithExtra, put }) {
      const result = yield callWithExtra(Service.onExport, payload, { withStatusHandle: true });
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
            type: 'fetch',
            payload: {
              page: 1,
              limit: 50,
              timestampRange: [],
              userAccount: "",
              ip: "",
              loginStatus: "",
            }
          });
        }
      });
    },
  }
}
