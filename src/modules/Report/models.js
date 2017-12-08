
import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as Service from './Service';
import * as tools from '../../utils/tools.js';
import { queryModelGenerator } from '../../utils/dvaModelGenerator';
import { commonCallConfig } from '../../configs/ExtraEffectsOptions';
import { NAMESPACE_BASE, NAMESPACE_ATTACK } from './ConstConfig.js'
moment.locale('zh-cn');

export default {
  namespace: NAMESPACE_BASE,
  state: {
    limit: 10,
    page: 1,
    timestampRange: [moment(), moment()],
    lastChangeTime: 0,
    keyvalue: 'attack_components'
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    changeLastChangeTime: (preState, { payload }) => {
      return {
        ...preState,
        lastChangeTime: payload,
      }
    }
  },
  effects: {
    *checkTime({ payload }, { call, put, select }) {
      const lastChangeTime = yield select(state => state[NAMESPACE_BASE].lastChangeTime)
      const timestampRange = yield select(state => state[NAMESPACE_ATTACK].timestampRange)
      const activeTabLastChangeTime = yield select(state => state[NAMESPACE_ATTACK].lastChangeTime)
      if (lastChangeTime !== activeTabLastChangeTime) {
        yield put({
          type: `${NAMESPACE_ATTACK}/fetch`,
          payload: {
            timestampRange
          }
        })
        yield put({
          type: `${NAMESPACE_ATTACK}/save`,
          payload: {
            lastChangeTime
          }
        })
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
        if (pathname === '/report') {
          dispatch({
            type: 'checkTime',
          });
        }
      });
    },
  }
}