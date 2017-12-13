/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import { queryModelGenerator } from '../../utils/dvaModelGenerator';
import { commonCallConfig } from '../../configs/ExtraEffectsOptions';

moment.locale('zh-cn');

const NAMESPACE = "analyseAttackChain";

const initFilters = {
  timestampRange: [],
  attackStage: ["invade", "install", "control", "intention"],
  limit: 20,
  page: 1,
}

const baseModel = {
  namespace: NAMESPACE,
  state: {
    queryFilters: initFilters,
    queryResults: {
      total: 0,
      data: []
    }
  },
  subscriptions: {
    initData({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === "/analyse/attack-chain") {
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

