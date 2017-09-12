/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import tableColumnsGenerator from '../../../utils/tableColumnsGenerator';
import JoTag from '../../../components/JoTag';
import {Icon,Switch,Card,Timeline,InputNumber,Button} from 'antd';
import classnames from 'classnames';
import * as tools from '../../../utils/tools';
import {
  rowDataIndexes,
  tableTextConfig,
  OPERATION_ROW_KEY,
  ROLE_DATAINDEX,
  USERACCOUNT_DATAINDEX,
  FREEZE_DATAINDEX,
  ADMIN_ROLE,
  COMMON_USER_ROLE,
  IS_NOT_FREEZE,
  IS_FREEZE
} from '../ConstConfig';
import {} from '../ConstConfig';


const roleRenderer=value=><JoTag >{tableTextConfig.enums.role[value]}</JoTag>


const freezeRenderer=value=>{
  if(value===IS_FREEZE){
    return <JoTag color="blue">{tableTextConfig.enums.freeze[value]}</JoTag>
  }
  if(value===IS_NOT_FREEZE){
    return <JoTag color="green">{tableTextConfig.enums.freeze[value]}</JoTag>
  }
}

const getOperationColumn=({handle={}}={})=>{
  return {
    title:tableTextConfig.rowTitles[OPERATION_ROW_KEY],
    key:OPERATION_ROW_KEY,
    render:records=>{
      if(records.role===ADMIN_ROLE){
        return
      }

      const freezePayload={
        userAccount:records.userAccount,
        freeze:IS_NOT_FREEZE
      }

      const buttonFreeze=(
        <Button onClick={handle.freeze(freezePayload)}
                disabled={records.freeze===IS_NOT_FREEZE}>
          {tableTextConfig.operation.freeze}
        </Button>
      )

      const buttonLimit=(
        <Button onClick={handle.limit(records)}
                type="primary">
          {tableTextConfig.operation.limit}
        </Button>
      )

      return (
        <Button.Group>
          {buttonFreeze}
          {buttonLimit}
        </Button.Group>
      )
    }
  }
}


export const getColumns=({handle={}}={})=>{

  const columns = tableColumnsGenerator({
    keys:rowDataIndexes,
    titleTextConfig:tableTextConfig.rowTitles,
    renderer:{
      [ROLE_DATAINDEX]:roleRenderer,
      [FREEZE_DATAINDEX]:freezeRenderer,
    }
  });

  return [
    ...columns,
    getOperationColumn({handle})
  ]

};


