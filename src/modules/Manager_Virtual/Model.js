/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import { queryModelGenerator } from '../../utils/dvaModelGenerator';
import { commonCallConfig } from '../../configs/ExtraEffectsOptions';
import { notification } from 'antd';
import {
  HOST_IP_DATAINDEX,
  HONEYPOT_IP_DATAINDEX,
  HONEYPOT_TYPE_ROW_KEY,
  HONEYPOT_STATUS_DATAINDEX,
  NAMESPACE
} from './ConstConfig';

import { HIGH_INTERATION, LOW_INTERACTION, NODE, STAND_ALONE } from 'configs/ConstConfig'

import { delay, setTemp, getTemp } from '../../utils/tools';

moment.locale('zh-cn');

notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 3,
});

export const HONEYPOT_CREATE_LIST_CACHE_NAMESPACE = "honeypotCreateList";

const callConfig = {
  withArgsCombiner: true,
  withStatusHandle: true,
  withTime: true,
}

const initFilters = {
  [HOST_IP_DATAINDEX]: [],
  [HONEYPOT_IP_DATAINDEX]: [],
  [HONEYPOT_TYPE_ROW_KEY]: [],
  [HONEYPOT_STATUS_DATAINDEX]: [],
  limit: 20,
  page: 1,
}


const baseModel = {
  namespace: NAMESPACE,
  state: {
    queryFilters: {
      ...initFilters
    },
    options: {
      [HOST_IP_DATAINDEX]: [],
      [HONEYPOT_IP_DATAINDEX]: []
    },
    queryResults: {
      total: 0,
      data: []
    },
    createList: getTemp(HONEYPOT_CREATE_LIST_CACHE_NAMESPACE) || {},
    createStatusPanelVisible: false
  },
  reducers: {
    saveOptions: (preState, { payload }) => {
      return {
        ...preState,
        options: {
          ...preState.options,
          ...payload
        }
      }
    },
    switchStatusPanel: (preState, { payload }) => {
      return {
        ...preState,
        createStatusPanelVisible: payload
      }
    },
    initCreateStatus: (preState, { payload }) => {
      const { honeypotId, data } = payload;
      return {
        ...preState,
        createList: {
          ...preState.createList,
          [honeypotId]: {
            data,
            status: 0,
            order: new Date().getTime()
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
    *getStatus({ resolve, payload = {} }, { callWithExtra, put, select }) {

      const res = yield callWithExtra(
        service.getStatus,
        payload,
        callConfig
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

      if (res.status === 1 && res.payload !== 3) {
        yield delay(2000);
        yield put({
          type: "getStatus",
          payload: {
            honeypotId: payload.honeypotId
          }
        })
      }

      yield put({
        type: "setCreateListTemp"
      })

      const visible = yield select(state => state[NAMESPACE].createStatusPanelVisible);

      if (res.status === 1 && res.payload === 3 && !visible) {
        const item = yield select(state => state[NAMESPACE].createList[payload.honeypotId])
        notification.success({
          message: '蜜罐虚拟机创建成功',
          description: `蜜罐${item.data.honeypotName}创建成功`,
        });
      }

      if (res.status === 1 && res.payload === 3) {
        const queryFilters = yield select(state => state[NAMESPACE].queryFilters);
        yield put({
          type: "query",
          payload: {
            ...queryFilters,
            page: 1
          }
        })
      }



    },
    *setCreateListTemp(action, { put, select }) {
      let createList = yield select(state => state[NAMESPACE].createList);

      createList = { ...createList };

      let ignoreList = [];

      Object.entries(createList).map(([honeypotId, { data, status }]) => {
        if (status === 3) {
          ignoreList.push(honeypotId);
        }
      })

      ignoreList.forEach(id => delete createList[id]);

      setTemp(HONEYPOT_CREATE_LIST_CACHE_NAMESPACE, createList);
    },
    *postVM({ resolve, payload = {} }, { callWithExtra, put }) {
      const res = yield callWithExtra(
        service.postVM,
        payload,
        callConfig
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

        yield put({
          type: "switchStatusPanel",
          payload: true
        })

        yield delay(1000);

        yield put({
          type: "getStatus",
          payload: {
            honeypotId: res.payload
          }
        })

      }

      yield put({
        type: "setCreateListTemp"
      })

    },
    *deleteVM({ resolve, payload }, { callWithExtra }) {
      const res = yield callWithExtra(
        service.deleteVM,
        { ...payload || {} },
        callConfig
      )
      if (res.status === 1) {
        resolve && resolve(res.payload)
      }
    },
    *putVM({ resolve, payload }, { callWithExtra }) {
      const res = yield callWithExtra(
        service.putVM,
        { ...payload || {} },
        callConfig
      )
      if (res.status === 1) {
        resolve && resolve(res.payload)
      }
    },
    *getVMIpList({ resolve, payload }, { put, callWithExtra }) {
      const res = yield callWithExtra(
        service.getVMIpList,
        { ...payload || {} },
        callConfig
      )
      if (res.status === 1) {
        yield put({
          type: "saveOptions",
          payload: {
            [HONEYPOT_IP_DATAINDEX]: res.payload
          }
        })
        resolve && resolve(res.payload)
      }
    },
    *getNodeIpList({ resolve }, { put, callWithExtra }) {
      const res = yield callWithExtra(
        service.getNodeIpList,
        {},
        callConfig
      )
      if (res.status === 1) {
        yield put({
          type: "saveOptions",
          payload: {
            [HOST_IP_DATAINDEX]: res.payload,
            [HONEYPOT_IP_DATAINDEX]: []
          }
        })
        resolve && resolve(res.payload)
      }
    },
    *getVMNameList({ resolve }, { put, callWithExtra }) {
      const res = yield callWithExtra(
        service.getVMNameList,
        {},
        callConfig
      )
      if (res.status === 1) {
        resolve && resolve(res.payload)
      }
    },
    *validate({ resolve, payload }, { callWithExtra }) {
      const res = yield callWithExtra(
        service.validate,
        payload,
        callConfig
      )
      if (res.status === 1) {
        resolve && resolve({ payload: res.payload, message: res.message })
      }
    },
    *getVMOption({ resolve, payload }, { callWithExtra }) {
      const res = yield callWithExtra(
        service.getVMOption,
        payload,
        callConfig
      )
      if (res.status === 1) {

        let finalPayload = {}

        Object.entries(res.payload).forEach(([hostIp, value]) => {

          finalPayload[hostIp] = {
            ...value[HIGH_INTERATION],
            [LOW_INTERACTION]: value[LOW_INTERACTION]["low_interaction"]
          }

        })

        console.info(finalPayload)

        resolve && resolve(finalPayload)
      }
    }
  },
  subscriptions: {
    initOptions: ({ history, dispatch }) => {
      return history.listen(({ pathname }) => {
        if (pathname === "/manager/virtual-machine") {
          const productType = getTemp("productType") || {}.type

          if (productType === NODE || productType === STAND_ALONE) {
            dispatch({
              type: "getNodeIpList"
            })
          }

          dispatch({
            type: "query",
            payload: initFilters
          })
        }
      })
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
});

