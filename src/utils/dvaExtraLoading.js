/**
 * Created by 13944 on 2017/8/7.
 */
/*
* 为整个app store添加一个loading model
* 可以控制所有effect的loaidng状态
* */
const combineExtraLoadingWtithApp=(app)=>{
  if(!app){
    return;
  }

  const initState={};

  app._models.forEach(m=>{
    Object.keys(m.effects||{}).forEach(k=>{
      initState[k]=false;
    })
  })

  app.model({
    namespace:"loading",
    state:{
      ...initState
    },
    reducers:{
      startLoading:(preState,{payload})=>{
        return {
          ...preState,
          [payload.type]:true
        }
      },
      endLoading:(preState,{payload})=>{
        return {
          ...preState,
          [payload.type]:false,
        }
      }
    }
  })
}


export default combineExtraLoadingWtithApp;
