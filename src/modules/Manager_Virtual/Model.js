/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import {queryModelGenerator} from '../../utils/dvaModelGenerator';
import {commonCallConfig} from '../../configs/ExtraEffectsOptions';
import {
  HOST_IP_DATAINDEX,
  HONEYPOT_IP_DATAINDEX,
  HONEYPOT_TYPE_ROW_KEY,
  HONEYPOT_STATUS_DATAINDEX,
  NAMESPACE
} from './ConstConfig';



moment.locale('zh-cn');



const baseModel={
  namespace: NAMESPACE,
  state: {
    queryFilters:{
      [HOST_IP_DATAINDEX]:[],
      [HONEYPOT_IP_DATAINDEX]:[],
      [HONEYPOT_TYPE_ROW_KEY]:[],
      [HONEYPOT_STATUS_DATAINDEX]:[],
      limit:20,
      page:1,
    },
    queryResults:{
      total:0,
      data:[]
    }
  },
  effects:{
    *getVMIpList({resolve,payload},{callWithExtra}) {
      const res=yield callWithExtra(
        service.getVMIpList,
        {...payload||{}},
        commonCallConfig
      )
      if(res.status===1){
        resolve&&resolve(res.payload)
      }
    },
    *getNodeIpList({resolve},{callWithExtra}) {
      const res=yield callWithExtra(
        service.getNodeIpList,
        {},
        commonCallConfig
      )
      if(res.status===1){
        resolve&&resolve(res.payload)
      }
    },
    *getVMNameList({resolve},{callWithExtra}) {
      const res=yield callWithExtra(
        service.getVMNameList,
        {},
        commonCallConfig
      )
      if(res.status===1){
        resolve&&resolve(res.payload)
      }
    }
  }
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
  initPath:"/manager/virtual-machine"
});

