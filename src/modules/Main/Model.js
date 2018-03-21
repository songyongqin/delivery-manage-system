/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux, match } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import { queryModelGenerator } from '../../utils/dvaModelGenerator';
import { commonCallConfig } from '../../configs/ExtraEffectsOptions';
import {
  EVENT_ACTION_DATA_INDEX,
  EVENT_TYPE_DATA_INDEX,
  NAMESPACE
} from './ConstConfig.js'
import Mousetrap from 'mousetrap'
import { DEBUG_MODE, SECRET_KEY_NAMESPACE, IV_NAMESPACE, OVER_DUE_NAMESPACE } from 'configs/ConstConfig'
import { Modal, message as Message, Input } from 'antd'
moment.locale('zh-cn')
import initDebugModal from './extraModal/debug'
import initKeyModal from './extraModal/key'
import initLogModal from './extraModal/log'
import { NAMESPACE as DEVICE_NAMESPACE } from '../Manager_Device/ConstConfig'
import { getTemp } from 'utils/tools'

const baseModel = {
  namespace: NAMESPACE,
  effects: {
    overdueHandle: function* ({ payload }, { put }) {
      yield put(routerRedux.push("/manager/device"))
    }
  },
  subscriptions: {
    setup: ({ history, dispatch }) => {
      initDebugModal()
      initKeyModal()
      // initLogModal()
      return history.listen(({ pathname }) => {
        if (sessionStorage.getItem(OVER_DUE_NAMESPACE) && pathname !== "/login" && pathname !== "/manager/device") {
          dispatch({
            type: `overdueHandle`,
          })
          dispatch({
            type: `${DEVICE_NAMESPACE}/changeOverdueTipVisible`,
            payload: true
          });
        }

      })
    }
  }
};

const payloadFilter = (payload) => {
  return {
    ...payload
  }
};



export default queryModelGenerator({
  model: baseModel,
  queryService: service.get,
  payloadFilter,
  callConfig: commonCallConfig,
});
