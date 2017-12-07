/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
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
import { DEBUG_MODE, SECRET_KEY_NAMESPACE, IV_NAMESPACE } from 'configs/ConstConfig'
import { Modal, message as Message, Input } from 'antd'
moment.locale('zh-cn');

import initDebugModal from './extraModal/debug'
import initKeyModal from './extraModal/key'
import initLogModal from './extraModal/log'

const baseModel = {
  namespace: NAMESPACE,
  subscriptions: {
    setup: ({ history, dispatch }) => {
      initDebugModal()
      initKeyModal()
      // initLogModal()
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
