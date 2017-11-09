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
} from './ConstConfig';
moment.locale('zh-cn');



const baseModel = {
  namespace: NAMESPACE,
  state: {

  },
  effects: {
    * test({ payload, resolve }, { callWithExtra }) {
      console.info("test")
    }
  }
};




export default baseModel;
