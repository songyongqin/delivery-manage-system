/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import {queryModelGenerator} from '../../utils/dvaModelGenerator';
import {commonCallConfig} from '../../configs/ExtraEffectsOptions';
import {NAMESPACE} from './ConstConfig';

moment.locale('zh-cn');

const baseModel={
  namespace: NAMESPACE,
  state: {
    queryFilters:{
      limit:20,
      page:1,
    },
    queryResults:{
      total:0,
      data:[]
    }
  },
};

const payloadFilter=(payload)=>{
  return {
    total:payload.total,
    data:payload.data,
  }
};

const queryService=service.query;

export default queryModelGenerator({
  model:baseModel,
  payloadFilter,
  callConfig:commonCallConfig,
  queryService,
  initPath:"/honeypot-manager/device"
});


