/**
 * Created by jojo on 2017/9/6.
 */
import React from 'react';
import QueryForm from './QueryForm/index'
import LimitSelectForm from './LimitSelectForm/index';
import {Button} from "antd";

export default ({queryFilters,isDark,formTextConfig,handle={},loading})=>{
  return (
    <div style={{margin:"15px 0"}}>
      <div style={{display:"inline-block",marginRight:"30px"}}>
        <QueryForm defaultValue={queryFilters}
                   textConfig={{
                     placeholder:formTextConfig.placeholder
                   }}
                   loading={loading}
                   onSubmit={handle.onQuery}/>
      </div>
      <div style={{display:"inline-block"}}>
        <LimitSelectForm defaultValue={queryFilters}
                         isDark={isDark}
                         onSubmit={handle.onSelectChange}/>
      </div>
      <div style={{display:"inline-block",textAlign:"right",float:"right"}}>
        <Button type="primary"
                size="large"
                onClick={handle.onExport}>
          导出
        </Button>
      </div>
    </div>
  )
}
