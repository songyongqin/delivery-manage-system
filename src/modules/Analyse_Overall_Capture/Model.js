/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import { queryModelGenerator } from '../../utils/dvaModelGenerator';
import { commonCallConfig } from '../../configs/ExtraEffectsOptions';
import {
  NAMESPACE,
  FAMILY_DATA_INDEX,
  MD5_DATA_INDEX,
  FILE_NAME_DATA_INDEX
} from './ConstConfig'
moment.locale('zh-cn');

export const initFilters = {
  timestampRange: [],
  [FILE_NAME_DATA_INDEX]: "",
  [MD5_DATA_INDEX]: "",
  [FAMILY_DATA_INDEX]: "",
  limit: 10,
  page: 1
}

const baseModel = {
  namespace: NAMESPACE,
  state: {
    queryFilters: initFilters,
    queryResults: {
      total: 0,
      data: []
    },
    lastTime: 0
  },
  effects: {

  },
  reducers: {
    setLastTime: (preState, { payload }) => {
      return {
        ...preState,
        lastTime: payload,
      }
    }
  }
};

const payloadFilter = payload => {
  return {
    data: payload.data,
    total: payload.total,
  }
}

export default queryModelGenerator({
  model: baseModel,
  queryService: service.get,
  payloadFilter,
  callConfig: commonCallConfig
});
