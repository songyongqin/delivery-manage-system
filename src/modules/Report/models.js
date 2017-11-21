
import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import { queryModelGenerator } from '../../utils/dvaModelGenerator';
import { commonCallConfig } from '../../configs/ExtraEffectsOptions';
import { NAMESPACE_BASE } from './ConstConfig.js'
moment.locale('zh-cn');

export default {
  namespace: NAMESPACE_BASE,
  state: {
    keyvalue: 'attack_components'
  },
  reducers: {
    save(state, { payload }) {
      console.info("aaa")
      return { ...state, ...payload };
    }
  },
  effects: {

  },

}