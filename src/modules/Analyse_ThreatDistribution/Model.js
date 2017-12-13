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

const baseModel = {
  namespace: NAMESPACE,
  state: {
    queryFilters: initFilters,
    queryResults: {
      data: {
        world: [],
        china: []
      }
    },
    mapType: "world"
  },
  reducers: {
    switchMapType: (preState, { payload }) => {
      return {
        ...preState,
        mapType: preState.mapType === "world" ? "china" : "world"
      }
    }
  },
  subscriptions: {
    initData({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === "/analyse/threat-distribution") {
          dispatch({
            type: `query`,
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
  // initPath: "/analyse/threat-distribution"
});

