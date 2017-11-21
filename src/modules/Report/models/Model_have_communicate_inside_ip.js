
import { routerRedux } from 'dva/router';
import * as Service from '../Service';
import { queryModelGenerator } from '../../../utils/dvaModelGenerator';
import { NAMESPACE_HAVECOMMUNICATEINSIDEIP, VALUE_HAVECOMMUNICATEINSIDEIP } from '../ConstConfig';
import * as tools from '../../../utils/tools.js';
export default {
  namespace: NAMESPACE_HAVECOMMUNICATEINSIDEIP,
  state: {
    data: [],
    loading: false,
    timestampRange: [],
    page: 1,
    limit: 10,
    exportdata: VALUE_HAVECOMMUNICATEINSIDEIP
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const result = yield call(Service.getREPORT_HAVE_COMMUNICATE_INSIDE_IP, payload);
      const data = result.payload.data;
      const page = payload.page ? payload.page : 1;
      const timestampRange = payload.timestampRange ? payload.timestampRange : [];
      if (result.status === 1) {
        yield put({
          type: 'save',
          payload: {
            page,
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
