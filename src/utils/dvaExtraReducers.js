/**
 * Created by 13944 on 2017/8/6.
 */

/*
* 为传入的model添加
* setInit setTime的reducer和相关的state
*
* */

const combineExtraReducers=(model)=>{

  const {reducers={},state={},namespace}=model;

  const wrappedReducers={
    ...reducers,
    [`${namespace}/setInit`]:(preState,{payload})=>{
      return {
        ...preState,
        isInit:true,
      }
    },
    [`${namespace}/setTime`]:(preState,{payload})=>{
      return {
        ...preState,
        lastReqTime:new Date().getTime()
      }
    }
  }

  const wrappedState={
    ...state,
    isInit:false,
    lastReqTime:0
  }

  return {
    ...model,
    reducers:wrappedReducers,
    state:wrappedState,
  }

}

export const combineExtraReducersWithApp=(app)=>{
  if(!app){
    return;
  }
  app._models=app._models.map(m=>combineExtraReducers(m))
}


export default combineExtraReducers;
