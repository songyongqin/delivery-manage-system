/**
 * Created by jojo on 2017/8/8.
 */

import {createSetResultsReducer,createSetQueryFilters} from './tools';
import {isFunction} from './tools';

const defaultPayloadFilter=(payload)=>{
  return payload;
}
const defaultCallConfig={
  withSetFilters:true,
}
const defaultKeyConfig={
  queryFilters:'queryFilters',
  queryResults:'queryResults',
}
/*
* 为一个model添加跟query相关的state reducer effect
*
* model为基础的model结构 或需要额外添加的model数据
* queryService为该queryModel获取数据的ajax方法
* payloadFilter为最终获取到的数据过滤的参数 若无 则自动获取res中的payload写入 queryResults
* callConfig call的拓展参数 需要结合dvaExtraEffects
* initPath 第一次进入该路径时 根据默认参数进行一次查询
* */
export const queryModelGenerator=({
                                    model={},
                                    queryService,
                                    payloadFilter=defaultPayloadFilter,
                                    callConfig=defaultCallConfig,
                                    successSign={status:1},
                                    keyConfig={},
                                    initPath=null,
                                  })=>{


  isFunction(queryService,"queryService");

  isFunction(payloadFilter,"payloadFilter");

  const {state={},reducers={},effects={},subscriptions={},namespace}=model;

  keyConfig={...defaultKeyConfig,...keyConfig}

  const wrappedState={
    [keyConfig.queryFilters]:{},
    [keyConfig.queryResults]:{},
    ...state
  }

  const wrappedReducers={
    ...reducers,
    setQueryFilters:createSetQueryFilters(),
    setQueryResults:createSetResultsReducer(keyConfig.queryResults)
  }

  const wrappedEffects={
    ...effects,
    *query({resolve,payload},{put,callWithExtra,select}) {

      const res=yield callWithExtra(
        queryService,
        {...payload||{}},
        callConfig
      )

      if(res.status===1){
        const store=yield select(state=>state);
        const filteredPayload=payloadFilter(res.payload,store);

        yield put({
          type:"setQueryResults",
          payload:filteredPayload,
        })
        yield put({
          type:"setTime"
        })
        resolve&&resolve(filteredPayload);
      }

    },
    *queryInit({resolve,payload},{put,select}) {
      const state=yield select(state=>state[namespace]);
      const queryFilters=state[keyConfig.queryFilters];
      const isInit=state.isInit;
      if(isInit){
        return;
      }
      yield put({
        type:"query",
        payload:{
          ...queryFilters
        }
      })
      yield put({
        type:"setInit",
      })
    }
  }

  const wrappedSubscriptions={
    ...subscriptions,
    init({ history, dispatch }) {

      if(!initPath){
        return
      }

      return history.listen(({ pathname }) => {
        if(pathname===initPath){
          dispatch({
            type:`queryInit`,
          })
        }
      });
    },
  }


  return {
    ...model,
    state:wrappedState,
    reducers:wrappedReducers,
    effects:wrappedEffects,
    subscriptions:wrappedSubscriptions,
  }
}

