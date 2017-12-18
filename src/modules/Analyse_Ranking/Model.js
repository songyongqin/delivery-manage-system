import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import { queryModelGenerator } from '../../utils/dvaModelGenerator';
import { commonCallConfig } from '../../configs/ExtraEffectsOptions';
import { statisticDataIndexes } from './ConstConfig';
import {
  NAMESPACE
} from './ConstConfig'


moment.locale('zh-cn');

const initFilters = {
  timestampRange: [],
}


const callConfig = {
  withStatusHandle: true,
}


const baseModel = {
  namespace: NAMESPACE,
  state: {
    queryFilters: initFilters,
    queryResults: {
      data: []
    },
    options: [],
    splitResults: {

    },
    loading: {

    }
  },
  reducers: {
    saveLoading: (preState, { payload }) => {
      return {
        ...preState,
        loading: {
          ...preState.loading,
          [payload.option]: payload.value
        }
      }
    },
    saveOptions: (preState, { payload }) => {
      return {
        ...preState,
        options: payload
      }
    },
    saveSplitResults: (preState, { payload }) => {
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
    getRankingOption: function* ({ payload }, { callWithExtra, put }) {
      const optionRes = yield callWithExtra(service.getRankingOption, {}, callConfig)
      const options = optionRes.status === 1 ? optionRes.payload : []
      yield put({
        type: "saveOptions",
        payload: options
      })

      yield options.map(option => put({
        type: "querySplit",
        payload: {
          ...initFilters,
          option
        }
      }))

    },
    querySplit: function* ({ payload = {}, resolve }, { callWithExtra, put }) {

      const { option } = payload

      yield put({
        type: "saveLoading",
        payload: {
          option,
          value: true
        }
      })

      const res = yield callWithExtra(service.get, { ...payload }, callConfig)

      if (res.status === 1) {
        yield put({
          type: "saveSplitResults",
          payload: {
            option,
            data: res.payload,
          }
        })
        resolve && resolve()
      }

      yield put({
        type: "saveLoading",
        payload: {
          option,
          value: false
        }
      })
    }

  },
  subscriptions: {
    initData({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === "/analyse/ranking") {
          dispatch({
            type: `getRankingOption`,
            payload: initFilters
          })
        }
      });
    },
  }

};

const payloadFilter = (payload) => {
  return {
    data: payload
  }
};

const queryService = service.get;

export default queryModelGenerator({
  model: baseModel,
  payloadFilter,
  callConfig: commonCallConfig,
  queryService,
  // initPath: "/analyse/ranking"
});


