/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import {queryModelGenerator} from '../../utils/dvaModelGenerator';
import {commonCallConfig} from '../../configs/ExtraEffectsOptions';

moment.locale('zh-cn');

const NAMESPACE="main";

const baseModel={
  namespace: NAMESPACE,
  state: {

  },
  effects:{

  }
};




export default baseModel;
