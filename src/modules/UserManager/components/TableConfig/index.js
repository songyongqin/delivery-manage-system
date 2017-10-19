/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import tableColumnsGenerator from '../../../../utils/tableColumnsGenerator';
import JoTag from '../../../../components/JoTag';
import {Icon,Switch,Card,Timeline,InputNumber,Button,Menu,Dropdown,Tooltip} from 'antd';
import classnames from 'classnames';
import * as tools from '../../../../utils/tools';
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
} from '../../ConstConfig';

const tipTextConfig={
  [ADMIN_ROLE]:"管理员唯一且拥有最高权限",
  [COMMON_USER_ROLE]:"普通用户仅具有查看威胁权限，无管理权限"
}

const roleRenderer=value=>(
  <Tooltip title={tipTextConfig[value]}>
    <JoTag >{tableTextConfig.enums.role[value]}</JoTag>
  </Tooltip>
)


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


      const menu=(
        <Menu>

          <Menu.Item disabled={records.freeze===IS_NOT_FREEZE}>
            <p onClick={records.freeze===IS_NOT_FREEZE
              ?
              null
              :
              handle.freeze(freezePayload)}>
              <Icon type="unlock"/>
              &nbsp;
              {tableTextConfig.operation.freeze}
            </p>
          </Menu.Item>

          <Menu.Item >
            <p onClick={handle.limit(records)}>
              <Icon type="edit"/>
              &nbsp;
              {tableTextConfig.operation.limit}
            </p>
          </Menu.Item>

          <Menu.Item >
            <p onClick={handle.getDelUserHandle(records[USERACCOUNT_DATAINDEX])}>
              <Icon type="delete"/>
              &nbsp;
              {tableTextConfig.operation.delete}
            </p>
          </Menu.Item>

          <Menu.Item >
            <p onClick={handle.getPatchUserHandle(records[USERACCOUNT_DATAINDEX])}>
              <Icon type="reload"/>
              &nbsp;
              {tableTextConfig.operation.reset}
            </p>
          </Menu.Item>
        </Menu>
      )


      return (
        <div>
          <Dropdown overlay={menu}>
            <Button icon="ellipsis" />
          </Dropdown>
        </div>
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


