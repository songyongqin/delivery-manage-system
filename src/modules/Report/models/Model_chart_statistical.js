
import { routerRedux } from 'dva/router';
import * as Service from '../Service';
import { queryModelGenerator } from '../../../utils/dvaModelGenerator';
import { NAMESPACE_CHART } from '../ConstConfig';
import * as tools from '../../../utils/tools.js';
import moment from 'moment';
export default {
  namespace: NAMESPACE_CHART,
  state: {
    data: [],
    loading: false,
    timestampRange: [moment(), moment()],
    lastChangeTime: -1,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const result = yield call(Service.getCHART_STATISTICAL, payload);
      const timestampRange = payload.timestampRange ? payload.timestampRange : [moment(), moment()];
      const limit = payload.limit ? payload.limit : 10;
      const data = result.payload;
      console.info(data)
      if (result.status === 1) {
        yield put({
          type: 'save',
          payload: {
            data,
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

  }
}