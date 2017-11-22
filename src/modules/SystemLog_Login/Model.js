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
    list: [],
    page: 1,
    loading: false,
    limit: 50,
    timestampRange: [],
    ip: "",
    userAccount: "",
    loginStatus: "",
  },
  reducers: {
    save(state, { payload }) {
      console.info(payload)
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const result = yield call(Service.search, payload);
      const list = result.payload.data;
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
