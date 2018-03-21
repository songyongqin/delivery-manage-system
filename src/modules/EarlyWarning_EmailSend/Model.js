/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import { queryModelGenerator } from '../../utils/dvaModelGenerator';
import { commonCallConfig } from '../../configs/ExtraEffectsOptions';
import { NAMESPACE } from './ConstConfig';
import * as tools from '../../utils/tools';
moment.locale('zh-cn');

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

    }
  },
  effects: {
    *put({ resolve, payload }, { callWithExtra }) {
      const res = yield callWithExtra(
        service.put,
        { ...payload || {} },
        callConfig
      )

      if (res.status === 1) {
        resolve && resolve(res.payload);
      }
    },
    *test({ resolve, payload }, { callWithExtra }) {
      const res = yield callWithExtra(
        service.testEmail,
        { ...payload || {} },
        callConfig
      )

      if (res.status === 1) {
        resolve && resolve(res.payload);
      }
    },
  }
};

const payloadFilter = (payload) => {
  return {
    ...payload,
  }
};

const queryService = service.query;


export default queryModelGenerator({
  model: baseModel,
  payloadFilter,
  callConfig: commonCallConfig,
  queryService,
  // initPath:"/early-warning/email"
});
