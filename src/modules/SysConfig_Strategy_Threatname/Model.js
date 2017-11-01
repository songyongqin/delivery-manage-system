/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import * as service from './Service';
import { queryModelGenerator } from '../../utils/dvaModelGenerator';
import { commonCallConfig } from '../../configs/ExtraEffectsOptions';
import { NAMESPACE, THREAT_NAME_NAME_DATAINDEX, THREAT_NAME_LEVEL_DATAINDEX } from './ConstConfig';


export const callConfig = {
  withStatusHandle: true,
  withLoading: true,
}


const baseModel = {
  namespace: NAMESPACE,
  state: {
    queryFilters: {
    },
    queryResults: {
      data: []
    }
  },
  reducers: {
    add: (preState, { payload }) => {
      let _queryResults = preState.queryResults;
      return {
        ...preState,
        queryResults: {
          ..._queryResults,
          data: [payload, ..._queryResults.data]
        }
      }
    },

    del: (preState, { payload }) => {
      let _queryResults = preState.queryResults,
        { index } = payload,
        { data } = _queryResults;
      return {
        ...preState,
        queryResults: {
          ..._queryResults,
          data: [
            ...data.slice(0, index),
            ...data.slice(index + 1)
          ]
        }
      }
    },

    modify: (preState, { payload }) => {
      let _queryResults = preState.queryResults,
        { index } = payload,
        level = payload[THREAT_NAME_LEVEL_DATAINDEX],
        { data } = _queryResults;
      return {
        ...preState,
        queryResults: {
          ..._queryResults,
          data: [
            ...data.slice(0, index),
            {
              ...data[index],
              [THREAT_NAME_LEVEL_DATAINDEX]: level,
            },
            ...data.slice(index + 1)]
        }
      }

    }
  },
  effects: {
    *delete({ resolve, payload }, { callWithExtra, select, put }) {
      const data = yield select(state => state[NAMESPACE].queryResults.data)
      let { index } = payload,
        { key } = data[index];
      const res = yield callWithExtra(
        service._delete,
        {
          key
        },
        callConfig
      )

      if (res.status === 1) {
        yield put({
          type: `del`,
          payload: {
            index,
          }
        })
        resolve && resolve(res.payload);
      }
    },
    *put({ resolve, payload }, { callWithExtra, select }) {
      const data = yield select(state => state[NAMESPACE].queryResults.data)
      const res = yield callWithExtra(
        service.put,
        data,
        callConfig
      )

      if (res.status === 1) {
        resolve && resolve(res.payload);
      }
    },
    *post({ resolve, payload = {} }, { callWithExtra, select, put }) {
      const res = yield callWithExtra(
        service.post,
        payload,
        callConfig
      )

      if (res.status === 1) {
        resolve && resolve(res.payload);
        yield put({
          type: "add",
          payload,
        })


      }
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
});

