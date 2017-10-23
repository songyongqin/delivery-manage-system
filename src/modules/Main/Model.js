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
moment.locale('zh-cn');


const baseModel = {
  namespace: NAMESPACE,
  state: {
    queryResults: {

    }
  },
  effects: {
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
