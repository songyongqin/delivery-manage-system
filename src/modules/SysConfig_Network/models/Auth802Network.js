import { routerRedux } from 'dva/router';
import * as service from '../Service';
import { queryModelGenerator } from 'utils/dvaModelGenerator';
import { commonCallConfig } from 'configs/ExtraEffectsOptions';
import {
  AUTH_NETWORK_802_NAMESPACE,
  AUTH_PASSWORD,
  AUTH_USER_ACCOUNT
} from '../ConstConfig';


export const callConfig = {
  withStatusHandle: true,
  withLoading: true,
}

const baseModel = {
  namespace: AUTH_NETWORK_802_NAMESPACE,
  state: {
    queryFilters: {
    },
    queryResults: {
      [AUTH_USER_ACCOUNT]: "",
      [AUTH_PASSWORD]: ""
    }
  },
  effects: {
    *put({ resolve, payload }, { callWithExtra }) {
      const res = yield callWithExtra(
        service.putAuthNetworkConfig,
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

const queryService = service.getAuthNetworkConfig;

export default queryModelGenerator({
  model: baseModel,
  payloadFilter,
  callConfig: commonCallConfig,
  queryService,
  // initPath:"/sys-config/network"
});
