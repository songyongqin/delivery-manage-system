/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import {queryModelGenerator} from '../../utils/dvaModelGenerator';
import {commonCallConfig} from '../../configs/ExtraEffectsOptions';

moment.locale('zh-cn');

const NAMESPACE="analyseAttackChain";

const baseModel={
  namespace: NAMESPACE,
  state: {
    queryFilters:{
      timestampRange:[],
      attackStage:["invade","install","control","intention"],
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
  initPath:"/analyse/attack-chain"
});

