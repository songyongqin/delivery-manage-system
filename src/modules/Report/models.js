
import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
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