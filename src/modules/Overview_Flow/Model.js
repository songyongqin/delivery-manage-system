import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import { queryModelGenerator } from '../../utils/dvaModelGenerator';
import { commonCallConfig } from '../../configs/ExtraEffectsOptions';
import { statisticDataIndexes } from './ConstConfig';
import { NODE, STAND_ALONE } from 'configs/ConstConfig'
import { getTemp } from 'utils/tools'
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
      data: []
    },
    data: [],
  },
  reducers: {
    saveFlowData: (preState, { payload }) => {
      return {
        ...preState,
        data: payload,
      }
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        const productType = (getTemp("productType") || {}).type
        if (pathname === "/overview" && productType !== NODE && productType !== STAND_ALONE) {
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
});


