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
    isInit:false
  },
  effects:{
    // *get({resolve,payload},{callWithExtra}) {
    //   const res=yield callWithExtra(
    //     service.get,
    //     {...payload||{}},
    //     commonCallConfig
    //   )
    //   console.info(res);
    //   if(res.status===1){
    //     resolve&&resolve(res.payload);
    //   }
    // }
  }
};

const payloadFilter=(payload)=>{
  return {
  }
};



export default queryModelGenerator({
  model:baseModel,
  queryService:service.get,
  payloadFilter,
  callConfig:commonCallConfig,
});
