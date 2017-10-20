/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import tableColumnsGenerator from '../../../../utils/tableColumnsGenerator';
import * as tools from '../../../../utils/tools';
import {Popconfirm} from 'antd';

import {
  THREAT_NAME_LEVEL_DATAINDEX,
  THREAT_NAME_NAME_DATAINDEX,
  THREAT_NAME_USER_DEFINED_DATAINDEX,
  THREAT_NAME_KEY_DATAINDEX,
  textConfig,
  levelTextConfig,
  dataIndexes,
  levels,
  USER_DEFINED_VALUE,
}from '../../ConstConfig';


import {Button,Switch,Icon,Select,Tooltip} from 'antd'

const getRenderer=({getDelHandle,getLevelOnChangeHandle})=>({

  [THREAT_NAME_LEVEL_DATAINDEX]:(value,records,index)=>(
    <Select value={value}
            onChange={getLevelOnChangeHandle(index)}
            size="large"
            style={{width:"100px"}}>
      {levels.map((i,index)=>(
        <Select.Option value={i}
                       key={`${index}-item`}>
          {tools.getKeyText(i,levelTextConfig)}
        </Select.Option>
      ))}
    </Select>
  ),

  [THREAT_NAME_USER_DEFINED_DATAINDEX]:(value,records,index)=>value===USER_DEFINED_VALUE&&
    <Popconfirm title="确定要删除该条威胁行为吗？"
                placement="topLeft"
                onConfirm={getDelHandle(index,records[THREAT_NAME_KEY_DATAINDEX])}>
      <a style={{color:"#d73435"}} >
        <Icon type="minus-circle" />
      </a>
    </Popconfirm>

})



export const getColumns=({getDelHandle,getLevelOnChangeHandle})=>tableColumnsGenerator({
  keys:dataIndexes,
  titleTextConfig:textConfig,
  renderer:getRenderer({getDelHandle,getLevelOnChangeHandle}),
  extraProps:{
    [THREAT_NAME_LEVEL_DATAINDEX]:{
      width:"45%"
    },
    [THREAT_NAME_NAME_DATAINDEX]:{
      width:"45%"
    },
    [THREAT_NAME_USER_DEFINED_DATAINDEX]:{
      width:"10%",
    }
  }
})
