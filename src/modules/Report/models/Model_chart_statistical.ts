
import { routerRedux } from 'dva/router';
import * as Service from '../Service';
import { NAMESPACE_CHART } from '../ConstConfig';
import * as tools from 'utils'
import moment from 'moment';
export default {
  namespace: NAMESPACE_CHART,
  state: {
    data: [],
    options: [],
    // loading: false,
    timestampRange: [moment(), moment()],
    lastChangeTime: -1,
    splitResults: {},
    loading: {}
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveLoading: (preState, { payload }) => {
      return {
        ...preState,
        loading: {
          ...preState.loading,
          [payload.option]: payload.value
        }
      }
    },
    saveOptions(preState, { payload }) {
      return {
        ...preState,
        options: payload
      }
    },
    saveSplitResults(preState, { payload }) {
      return {
        ...preState,
        splitResults: {
          ...preState.splitResults,
          [payload.option]: payload.data,
        }
      }
    }
  },
  effects: {
    *getRankingOption({ payload }, { call, put }) {
      const optionRes = yield call(Service.getRankingOption, {});
      const timestampRange = payload.timestampRange ? payload.timestampRange : [moment(), moment()];
      const options = optionRes.status === 1 ? optionRes.payload : [];
      yield put({
        type: "saveOptions",
        payload: options
      })
      yield options.map(option => put({
        type: "fetch",
        payload: {
          timestampRange,
          option
        }
      }))

    },
    *fetch({ payload }, { call, put }) {
      const { option } = payload;
      yield put({
        type: "saveLoading",
        payload: {
          option,
          value: true
        }
      })
      const result = yield call(Service.getCHART_STATISTICAL, payload);
      const data = result.payload;
      if (result.status === 1) {
        yield put({
          type: "saveSplitResults",
          payload: {
            option,
            data
          }
        })
      }
      yield put({
        type: "saveLoading",
        payload: {
          option,
          value: false
        }
      })
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
