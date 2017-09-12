/**
 * Created by 13944 on 2017/7/31.
 */
/*
*
* */
const combineExtraEffects=(model,options={},extraSagaEffects={})=>{

  Object.keys(options).forEach(select=>{
    isFunction(options[select],select);
  });

  const {effects={}}=model;

  const wrappedEffects={};

  Object.keys(effects).forEach(key=>{
    wrappedEffects[key]=function *(action,sagaEffects) {
      const extraSagaEffects={
        ...sagaEffects,
        callWithStatusHandle:createExtraCall(action,sagaEffects,{withStatusHandle:true},options),
        callWithArgsCombiner:createExtraCall(action,sagaEffects,{withArgsCombiner:true},options),
        callWithLoading:createExtraCall(action,sagaEffects,{withLoading:true},options),
        callWithSetFilters:createExtraCall(action,sagaEffects,{withSetFilters:true},options),
        callWithTime:createExtraCall(action,sagaEffects,{callWithTime:true},options),
        callWithExtra:(serviceFn,args,config)=>{
          return createExtraCall(action,sagaEffects,config,options)(serviceFn,args);
        },
        ...extraSagaEffects
      };
      yield effects[key](action, extraSagaEffects);
    }
  });

  return {
    ...model,
    effects:wrappedEffects
  };
}
/*
* 根据不同的参数处理call的整个流程
* withArgsCombiner：
* options可附带argsCombiner方法 可对call方法传出的参数做额外的处理，返回需要额外添加的数据
* 例如附带token信息
*
* withStatusHandle:
* options附带stautsHanlde方法 可在请求返回后 获取结果 根据status不同进行不同的处理
* 例如可在此处对status不为1的值 发送全局错误信息提示
*
* withLoading
* 整个effects开始发起请求时 将全局的state.loading[effectName] 值设为true
* 请求结束后 将其设置为false 需要结合dvaExtraLoading
*
* withSetFilters:
* 发出请求时，将发出的参数写入store里 该方法需要结合 queryModelGenerator使用
*
* withTime:
* 请求结束后 ，将当前时间戳记录下进 lastReqTime 需要结合dvaExtraReducers
* */

function createExtraCall(action,sagaEffects,config={},stateSelects={}) {

  const {put,call,select}=sagaEffects,
        {resolve,reject,type=""}=action;

  return function *(serviceFn,args={}) {

    let result=null;

    const {withArgsCombiner,withStatusHandle,withLoading,withSetFilters,withTime}=config;

    const {argsCombiner,statusHandle}=stateSelects;

    try{
      if(withSetFilters){

        yield put({
          type:'setQueryFilters',
          payload:action.payload,
        })

      }

      if(withLoading){
        yield put({
          type:"loading/startLoading",
          payload:{
            type:action.type
          }
        })
      }

      if(withArgsCombiner){
        isFunction(argsCombiner,"argsCombiner");
        const extraArgs = yield argsCombiner(action,sagaEffects,args);
        args=Object.assign({},args,{...extraArgs||{}});
      }


      result=yield call(serviceFn,args);


      if(withStatusHandle){
        isFunction(statusHandle,"statusHandle");
        yield statusHandle(action,sagaEffects,result);
      }


    }catch(e){

      console.error(e.message);
      throw e;

    }finally {

      yield  delay(500);

      if(withLoading){
        yield put({
          type:"loading/endLoading",
          payload:{
            type:action.type
          }
        })
      }
      if(withTime){
        yield put({
          type:"setTime"
        })
      }


    }

    return result;

  }
}
function delay(times) {
  return new Promise((resolve)=>{
    setTimeout(function () {
      resolve();
    },times)
  })
}


function isFunction(fn,name) {
  if(typeof fn!=="function"){
    throw new Error(`${name} should type of function`)
  }
}
/*
* 传入整个app对象和options
* 给所有model添加extraEffects方法
* */

export const combineExtraEffectsWithApp=(app,options)=>{
  if(!app){
    return;
  }
  app._models=app._models.map(m=>combineExtraEffects(m,options))
}

export default combineExtraEffects;
