/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import * as service from './Service';
import {queryModelGenerator} from '../../utils/dvaModelGenerator';
import {commonCallConfig} from '../../configs/ExtraEffectsOptions';
import {NAMESPACE} from './ConstConfig';



export const callConfig={
  withStatusHandle:true,
  withLoading:true,
}


const baseModel={
  namespace: NAMESPACE,
  state: {
    queryFilters:{
    },
    queryResults:{
      data:[],
      total:0,
    }
  },
  effects:{
    *put({resolve,payload},{callWithExtra}) {
      const res=yield callWithExtra(
        service.put,
        {...payload||{}},
        callConfig
      )

      if(res.status===1){
        resolve&&resolve(res.payload);
      }
    },
    *post({resolve,payload},{callWithExtra}) {
      const res=yield callWithExtra(
        service.post,
        {...payload||{}},
        callConfig
      )

      if(res.status===1){
        resolve&&resolve(res.payload);
      }
    },
    *delete({resolve,payload},{callWithExtra}) {
      const res=yield callWithExtra(
        service._delete,
        {...payload||{}},
        callConfig
      )

      if(res.status===1){
        resolve&&resolve(res.payload);
      }
    },
    *getThreatname({resolve,payload},{callWithExtra}) {
      const res=yield callWithExtra(
        service.getThreatname,
        {...payload||{}},
        callConfig
      )
      if(res.status===1){
        resolve&&resolve(res.payload);
      }
    },
  }
};

const payloadFilter=(payload)=>{
  return {
    data:payload.data,
    total:payload.total,
  }
};

const queryService=service.get;

export default queryModelGenerator({
  model:baseModel,
  payloadFilter,
  callConfig:commonCallConfig,
  queryService,
});

