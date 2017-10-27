/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import { queryModelGenerator } from '../../utils/dvaModelGenerator';
import { commonCallConfig } from '../../configs/ExtraEffectsOptions';
import {
  NAMESPACE
} from './ConstConfig'
moment.locale('zh-cn');

const baseModel = {
  namespace: NAMESPACE,
  state: {
    timestampRange: [],
    lastTime: 0,
  },
  reducers: {
    setTimestampRange: (preState, { payload }) => {
      return {
        ...preState,
        timestampRange: payload,
        lastTime: new Date().getTime()
      }
    }
  },
  effects: {

  }
};




export default baseModel;
