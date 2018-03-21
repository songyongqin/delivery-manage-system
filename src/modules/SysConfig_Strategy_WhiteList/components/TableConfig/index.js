/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import tableColumnsGenerator from '../../../../utils/tableColumnsGenerator';

import {Popconfirm} from 'antd';
import {
  dataIndexes,
  textConfig,
  STRATEGY_OPERATION_KEY,
  OPEN_DATAINDEX,
  OPEN_VALUE,
  ID_DATAINDEX
}from '../../ConstConfig';


import {Button,Switch,Icon} from 'antd'

function getRenderer({getUsefulOnChangeHandle,getDelHandle}) {
  return {
    [OPEN_DATAINDEX]:(value,records)=>(
      <Switch  checkedChildren={<Icon type="check" />}
               onChange={getUsefulOnChangeHandle(records[ID_DATAINDEX])}
               unCheckedChildren={<Icon type="cross" />}
               defaultChecked={value===OPEN_VALUE}/>
    ),
    [STRATEGY_OPERATION_KEY]:(value,records,index)=>(
      <Popconfirm title="是否删除该白名单特征？"
                  onConfirm={getDelHandle(records[ID_DATAINDEX])}>
        <Button type="danger"
                style={{
                  color:"white",
                  background:"#f04134",
                  borderColor:"#f04134"
                }}>
          删除
        </Button>
      </Popconfirm>
    )
  }

}

export const getColumns=({getUsefulOnChangeHandle,getDelHandle}={})=>
  tableColumnsGenerator({
    keys:dataIndexes,
    titleTextConfig:textConfig,
    renderer:getRenderer({getUsefulOnChangeHandle,getDelHandle}),
  })



