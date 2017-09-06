/**
 * Created by jojo on 2017/8/30.
 */
import React from 'react';
import {Icon} from 'antd';

export default ({keys=[],titleTextConfig={},filterTextConfig={},filterOptions={},filteredValue={},renderer={},extraProps={}})=>{

  return keys.map(k=>{

    let column={
      title:k in titleTextConfig?titleTextConfig[k]:k,
      dataIndex:k,
    }

    if(k in renderer){
      column.render=renderer[k];
    }

    if(k in filterOptions){

      let targetTextConfig=filterTextConfig[k]||{}

      column.filters=filterOptions[k].map(f=>{
        return {
          text:f in targetTextConfig?targetTextConfig[f]:f,
          value:f
        }
      });

      column.filteredValue=filteredValue[k];
      column.filterIcon=<Icon type="filter" style={{color:"#108ee9"}}/>
    }

    if(k in extraProps){
      column={
        ...column,
        ...extraProps[k]
      }
    }

    return column;
  })
}
