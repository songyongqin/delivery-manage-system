import { routerRedux } from 'dva/router';
import * as service from '../Service';
import { queryModelGenerator } from 'utils/dvaModelGenerator';
import { commonCallConfig } from 'configs/ExtraEffectsOptions';
import {
  CONTROL_CONFIG_NAMESPACE,
  ENABLED_DATA_INDEX,
  SERVER_IP_DATA_INDEX,
  SERVER_PORT_DATA_INDEX
} from '../ConstConfig';


export const callConfig = {
  withStatusHandle: true,
  withLoading: true,
}

const baseModel = {
  namespace: CONTROL_CONFIG_NAMESPACE,
  state: {
    queryFilters: {
    },
    queryResults: {
      ip: ""
    }
  },
  effects: {
    *put({ resolve, payload }, { callWithExtra }) {
      const res = yield callWithExtra(
        service.putControlConfig,
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
    ip: payload
  }
};

const queryService = service.getControlConfig;

export default queryModelGenerator({
  model: baseModel,
  payloadFilter,
  callConfig: commonCallConfig,
  queryService,
  // initPath:"/sys-config/network"
});