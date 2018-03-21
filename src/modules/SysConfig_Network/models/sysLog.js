import { routerRedux } from 'dva/router';
import * as service from '../Service';
import { queryModelGenerator } from 'utils/dvaModelGenerator';
import { commonCallConfig } from 'configs/ExtraEffectsOptions';
import {
  SYS_LOG_CONFIG_NAMESPACE,
  ENABLED_DATA_INDEX,
  SERVER_IP_DATA_INDEX,
  SERVER_PORT_DATA_INDEX
} from '../ConstConfig';


export const callConfig = {
  withStatusHandle: true,
  withLoading: true,
}

const baseModel = {
  namespace: SYS_LOG_CONFIG_NAMESPACE,
  state: {
    queryFilters: {
    },
    queryResults: {
      [ENABLED_DATA_INDEX]: 0,
      [SERVER_IP_DATA_INDEX]: "",
      [SERVER_PORT_DATA_INDEX]: ""
    }
  },
  effects: {
    *put({ resolve, payload }, { callWithExtra }) {
      const res = yield callWithExtra(
        service.putSysLogConfig,
        { ...payload || {} },
        callConfig
      )

      if (res.status === 1) {
        resolve && resolve(res.payload);
      }
    }
  }
};

const payloadFilter = (payload = {}) => {
  return {
    ...payload
  }
};

const queryService = service.getSysLogConfig;

export default queryModelGenerator({
  model: baseModel,
  payloadFilter,
  callConfig: commonCallConfig,
  queryService,
  // initPath:"/sys-config/network"
});
