import { routerRedux } from 'dva/router';
import * as service from './Service';
import * as tools from '../../utils/tools';

export default {
  namespace: 'non_x86_sandbox_report',
  state: {
    data: {},
  },
  reducers: {

  },
  effects: {
    /*
    *
    * */
    *getReport({ payload, resolve, reject }, { call, put, select, callWithExtra, callWithStatusHandle }) {
      const res = yield call(service.getReport, payload);

      if (res.status === 1) {

        resolve && resolve(res)
      }
      else {
        reject && reject(res.payload)
      }

    }
    /*
    *
    * */

  },
  subscriptions: {

  },
};
