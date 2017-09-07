/**
 * Created by jojo on 2017/8/4.
 */
import {message as Message} from 'antd';


Message.config({
  duration:3,
  top:70,
})


/*
*  处理全局错误信息
*  ignoreActionTypes中保存不处理的action Type
* */
const ignoreActionTypes=["user/postSign"]
function messageHandle(res,type) {
  if(res.status!==1&&ignoreActionTypes.indexOf(type)===-1){
    Message.error(res.message||res.payload);
  }
}
/*
* 处理promise 的reject
* */
function rejectHandle(res,reject) {
  if(res.status!==1){
    reject&&reject(res.message||res.payload);
  }
}

export default {
  *argsCombiner({payload,resolve,reject},{call,put,select},args) {

    // const token=yield select(state=>state.user.token);
    //
    // return {
    //   token,
    // };
  },
  *statusHandle({payload,resolve,reject,type},{call,put},res) {

    messageHandle(res,type);

    rejectHandle(res,reject);

    return;
  }
}

export const commonCallConfig={
  withArgsCombiner:true,
  withStatusHandle:true,
  withLoading:true,
  withSetFilters:true,
  withTime:true,
}
