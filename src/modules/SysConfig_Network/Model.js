/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import * as service from './Service';
import {queryModelGenerator} from '../../utils/dvaModelGenerator';
import {commonCallConfig} from '../../configs/ExtraEffectsOptions';
import {
  NAMESPACE,
  DNS_DATAINDEX,
  ADAPTER_LIST_DATAINDEX
} from './ConstConfig';


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
      [DNS_DATAINDEX]:"",
      [ADAPTER_LIST_DATAINDEX]:[]
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
    }
  }
};

const payloadFilter=(payload)=>{
  return {
    [DNS_DATAINDEX]:payload[DNS_DATAINDEX],
    [ADAPTER_LIST_DATAINDEX]:payload[ADAPTER_LIST_DATAINDEX]
  }
};

const queryService=service.get;

export default queryModelGenerator({
  model:baseModel,
  payloadFilter,
  callConfig:commonCallConfig,
  queryService,
  // initPath:"/sys-config/network"
});
