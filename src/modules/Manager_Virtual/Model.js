/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import { queryModelGenerator } from '../../utils/dvaModelGenerator';
import { commonCallConfig } from '../../configs/ExtraEffectsOptions';
import {
  HOST_IP_DATAINDEX,
  HONEYPOT_IP_DATAINDEX,
  HONEYPOT_TYPE_ROW_KEY,
  HONEYPOT_STATUS_DATAINDEX,
  NAMESPACE
} from './ConstConfig';

import { delay } from '../../utils/tools';

moment.locale('zh-cn');



const baseModel = {
  namespace: NAMESPACE,
  state: {
    queryFilters: {
      [HOST_IP_DATAINDEX]: [],
      [HONEYPOT_IP_DATAINDEX]: [],
      [HONEYPOT_TYPE_ROW_KEY]: [],
      [HONEYPOT_STATUS_DATAINDEX]: [],
      limit: 20,
      page: 1,
    },
    queryResults: {
      total: 0,
      data: []
    },
    createList: {

    }
  },
  reducers: {
    initCreateStatus: (preState, { payload }) => {
      const { honeypotId, data } = payload;
      return {
        ...preState,
        createList: {
          ...preState.createList,
          [honeypotId]: {
            data,
            status: 0
          }
        }
      }
    },
    saveCreateStatus: (preState, { payload }) => {
      const { honeypotId, status } = payload;
      return {
        ...preState,
        createList: {
          ...preState.createList,
          [honeypotId]: {
            ...preState.createList[honeypotId],
            status
          }
        }
      }
    }
  },
  effects: {
    *getStatus({ resolve, payload = {} }, { callWithExtra, put }) {
      const res = yield callWithExtra(
        service.getStatus,
        payload,
        commonCallConfig
      )
      if (res.status === 1) {
        resolve && resolve(res.payload);
        yield put({
          type: "saveCreateStatus",
          payload: {
            honeypotId: payload.honeypotId,
            status: res.payload
          }
        })
      }
    },
    *postVM({ resolve, payload = {} }, { callWithExtra, put }) {
      const res = yield callWithExtra(
        service.postVM,
        payload,
        commonCallConfig
      )
      if (res.status === 1) {
        resolve && resolve(res.payload)
        yield put({
          type: "initCreateStatus",
          payload: {
            honeypotId: res.payload,
            data: payload,
          }
        })

        yield delay(1000);
        yield put({
          type: "getStatus",
          payload: {
            honeypotId: res.payload
          }
        })


      }
    },
    *getVMIpList({ resolve, payload }, { callWithExtra }) {
      const res = yield callWithExtra(
        service.getVMIpList,
        { ...payload || {} },
        commonCallConfig
      )
      if (res.status === 1) {
        resolve && resolve(res.payload)
      }
    },
    *getNodeIpList({ resolve }, { callWithExtra }) {
      const res = yield callWithExtra(
        service.getNodeIpList,
        {},
        commonCallConfig
      )
      if (res.status === 1) {
        resolve && resolve(res.payload)
      }
    },
    *getVMNameList({ resolve }, { callWithExtra }) {
      const res = yield callWithExtra(
        service.getVMNameList,
        {},
        commonCallConfig
      )
      if (res.status === 1) {
        resolve && resolve(res.payload)
      }
    },
    *validate({ resolve, payload }, { callWithExtra }) {
      const res = yield callWithExtra(
        service.validate,
        payload,
        commonCallConfig
      )
      if (res.status === 1) {
        resolve && resolve(res.payload)
      }
    }
  }
};

const payloadFilter = (payload) => {
  return {
    total: payload.total,
    data: payload.data,
    statistics: payload.statistics,
  }
};

const queryService = service.query;

export default queryModelGenerator({
  model: baseModel,
  payloadFilter,
  callConfig: commonCallConfig,
  queryService,
  initPath: "/manager/virtual-machine"
});

