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
  PATH_DATA_INDEX,
} from './ConstConfig'
moment.locale('zh-cn');

const baseModel = {
  namespace: NAMESPACE,
  state: {
    queryFilters: {
      timestampRange: [],
      [PATH_DATA_INDEX]: "",
      limit: 10,
      page: 1
    },
    queryResults: {
      total: 0,
      data: []
    }
  },
  effects: {

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
