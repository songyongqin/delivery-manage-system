/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import {queryModelGenerator} from '../../utils/dvaModelGenerator';
import {commonCallConfig} from '../../configs/ExtraEffectsOptions';

moment.locale('zh-cn');

const NAMESPACE="analyseEvent";

const baseModel={
  namespace: NAMESPACE,
  state: {
    queryFilters:{
      timestampRange:[],
      mergeCounts:10,
      attackStage:[],
      action:[],
      level:[],
      actionStatus:[],
      limit:20,
      page:1,
    },
    queryResults:{
      total:0,
      statistics:{

      },
      data:[]
    }
  },
};

const payloadFilter=(payload)=>{
  return {
    total:payload.total,
    data:payload.data,
    statistics:payload.statistics,
  }
};

const queryService=service.query;

export default queryModelGenerator({
  model:baseModel,
  payloadFilter,
  callConfig:commonCallConfig,
  queryService,
  initPath:"/analyse/event"
});


