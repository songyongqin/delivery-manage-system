/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import { queryModelGenerator } from '../../utils/dvaModelGenerator';
import { commonCallConfig } from '../../configs/ExtraEffectsOptions';
import { NAMESPACE, TOOL_NAME_DATAINDEX, MD5_DATAINDEX } from './ConstConfig';
moment.locale('zh-cn');

const baseModel = {
  namespace: NAMESPACE,
  state: {
    queryFilters: {
      timestampRange: [],
      // value:null,
      [TOOL_NAME_DATAINDEX]: "",
      [MD5_DATAINDEX]: "",
      limit: 20,
      page: 1,
    },
    initFilters: {
      [TOOL_NAME_DATAINDEX]: "",
      [MD5_DATAINDEX]: "",
    },
    queryResults: {
      total: 0,
      data: []
    }
  },
  effects: {
    *post({ resolve, payload }, { callWithExtra }) {

      const res = yield callWithExtra(
        service.post,
        { ...payload || {} },
        {
          withStatusHandle: true,
        }
      )

      if (res.status === 1) {
        resolve && resolve(res.payload);
      }

    }
  }
};

const payloadFilter = (payload) => {
  return {
    total: payload.total,
    data: payload.data,
  }
};

const queryService = service.query;

export default queryModelGenerator({
  model: baseModel,
  payloadFilter,
  callConfig: commonCallConfig,
  queryService,
});


