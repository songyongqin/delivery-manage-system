/**
 * Created by 13944 on 2017/8/13.
 */
import React from 'react';
import {createMapDispatchWithPromise} from './dvaExtraDispatch'
import {WithAnimateRender} from '../components/HOSComponents/HOSComponents';
import { connect } from 'dva';

function defaultMapStateToProps(state) {
  return {

  }
}

function defaultMapDispatchToProps(dispatch) {
  return {

  }
}
/*
*
* 使用方法
* queryContainerGenerator(options)(wrappedComponent)
* 传入options后返回一个高阶函数组件 再传入需要增强的组件后返回组合后的高阶组件
* */
export const queryContainerGenerator=({
                                 namespace,
                                 mapStateToProps=defaultMapStateToProps,
                                 mapDispatchToProps=defaultMapDispatchToProps})=>{

  /*
  *
  *
  * */
  if(!namespace){
    throw new Error("function queryContainerGenerator should offer model namespace");
  }
  /*
  * */
  function wrappedMapStateProps(state) {

    return {
      ...mapStateToProps(state),
      [namespace]:state[namespace],
      queryLoading:state.loading[`${namespace}/query`],
      lastReqTime:state[namespace].lastReqTime
    }
  }

  /*
  * 拓展的dispatch query方法
  * */

  function extraMapDispatchToProps(dispatch,ownProps) {
    return {
      dispatch,
      query:(payload)=>{
        return dispatch({
          type:`${namespace}/query`,
          payload:{
            ...payload,
          }
        })
      }
    }
  }
  /*
  * extra 拓展的dispatchMapToProps 添加附带promise
  * 将配置的mapDispatchToProps 与extraDispatchMapToProps结合 作为最终的mapDispatchToProps
  * */
  function wrappedMapDispatchToProps(dispatch,ownProps) {
    return {
      ...mapDispatchToProps(dispatch,ownProps),
      ...createMapDispatchWithPromise(extraMapDispatchToProps)(dispatch,ownProps),
    }
  }

  /*
  * 返回一个高阶组件函数
  * */
  return (WrappedComponent)=>{

    @connect(wrappedMapStateProps,wrappedMapDispatchToProps)
    @WithAnimateRender
    class QueryContainer extends React.Component{
      displayName=`QueryContainer_${namespace}`;
      constructor(props){
        super(props);
      }

      render=()=>{
        return <WrappedComponent {...this.props} />
      }
    }

    return QueryContainer;
  }


};
