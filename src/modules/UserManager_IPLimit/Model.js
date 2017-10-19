/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import {queryModelGenerator} from '../../utils/dvaModelGenerator';
import {commonCallConfig} from '../../configs/ExtraEffectsOptions';
import {
  NAMESPACE,
  IPLIMIT_DATAINDEX,
  ADMIN_LIMIT_DATAINDEX,
  COMMON_LIMIT_DATAINDEX,
  IP_RANGE_DATAINDEX,
  ROLE_DATAINDEX,
  OPEN_DATAINDEX
} from './ConstConfig';
moment.locale('zh-cn');



export const callConfig={
  withArgsCombiner:true,
  withStatusHandle:true,
  withLoading:true,
}


const baseModel={
  namespace: NAMESPACE,
  state: {
    queryFilters:{
    },
    queryResults:{
      [OPEN_DATAINDEX]:0,
      data:[]
    }
  },
  effects:{
    *put({resolve,payload},{callWithExtra,put}) {
      const res=yield callWithExtra(
        service.put,
        {...payload||{}},
        callConfig
      )

      if(res.status===1){
        resolve&&resolve(res.payload);
      }
    },
    *delete({resolve,payload},{callWithExtra,put}) {
      const res=yield callWithExtra(
        service._delete,
        {...payload||{}},
        callConfig
      )

      if(res.status===1){
        resolve&&resolve(res.payload);
      }
    },
    *post({resolve,payload},{callWithExtra,put}) {
      const res=yield callWithExtra(
        service.post,
        {...payload||{}},
        callConfig
      )

      if(res.status===1){
        resolve&&resolve(res.payload);
      }
    },
  }
};

const payloadFilter=(payload={})=>{
  try{
    return {
      [OPEN_DATAINDEX]:payload[OPEN_DATAINDEX],
      data:[
        {
          [ROLE_DATAINDEX]:ADMIN_LIMIT_DATAINDEX,
          [IP_RANGE_DATAINDEX]:payload[IPLIMIT_DATAINDEX][ADMIN_LIMIT_DATAINDEX]
        },
        {
          [ROLE_DATAINDEX]:COMMON_LIMIT_DATAINDEX,
          [IP_RANGE_DATAINDEX]:payload[IPLIMIT_DATAINDEX][COMMON_LIMIT_DATAINDEX]
        }
      ]
    }
  }catch(e){
    console.warn(e);
    return {
      [OPEN_DATAINDEX]:0,
      data:[]
    }
  }
};

const queryService=service.query;

export default queryModelGenerator({
  model:baseModel,
  payloadFilter,
  callConfig:commonCallConfig,
  queryService,
});


