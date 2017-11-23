
import { routerRedux } from 'dva/router';
import * as Service from '../Service';
import { queryModelGenerator } from '../../../utils/dvaModelGenerator';
import { NAMESPACE_ATTACK, NAMESPACE_BASE } from '../ConstConfig';
import * as tools from '../../../utils/tools.js';
import moment from 'moment';
export default {
  namespace: NAMESPACE_ATTACK,
  state: {
    data: [],
    loading: false,
    timestampRange: [moment(), moment()],
    page: 1,
    limit: 10,
    lastChangeTime: -1,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      const lastChangeTime = yield select(state => state[NAMESPACE_BASE].lastChangeTime)
      const result = yield call(Service.getAttack, payload);
      const timestampRange = payload.timestampRange ? payload.timestampRange : [moment(), moment()];
      const limit = payload.limit ? payload.limit : 10;
      const data = result.payload;
      if (result.status === 1) {
        yield put({
          type: 'save',
          payload: {
            data,
            limit,
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
    // setup({ dispatch, history }) {
    //   return history.listen(({ pathname }) => {
    //     if (pathname === '/report') {
    //       dispatch({
    //         type: 'fetch',
    //         payload: {
    //           timestampRange: [moment(), moment()]
    //         }
    //       });
    //     }
    //   });
    // },
  }
}
