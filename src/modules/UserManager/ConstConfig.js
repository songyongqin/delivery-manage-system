/**
 * Created by jojo on 2017/9/5.
 */

import React from 'react';
import JoIcon from '../../components/JoIcon';


export const NAMESPACE="userManager";
/**************************************************
 * table
 **************************************************/
const ROLE_DATAINDEX="role",
      USERACCOUNT_DATAINDEX="userAccount",
      FREEZE_DATAINDEX="freeze";



export const LIMIT_DATAINDEX="limit";
export const LIMIT_ATTACK_DATAINDEX="attack";
export const LIMIT_CHART_DATAINDEX="chart";


export const OPREATION_ROW_KEY="operation"

export const rowDataIndexes=[
  ROLE_DATAINDEX,
  USERACCOUNT_DATAINDEX,
  FREEZE_DATAINDEX,
];

const TABLE_TITLE= <span><JoIcon type="team"/>&nbsp;用户列表</span>


const  IS_FREEZE=1,IS_NOT_FREEZE=0;

const ADMIN_ROLE=1,COMMON_USER_ROLE=2;

const FREEZE_BUTTON="解除该用户冻结";
const LIMIT_BUTTON="管理该用户权限"
const CREATE_BUTTON="添加用户";

export const tableTextConfig={
  title:TABLE_TITLE,
  rowTitles:{
    [USERACCOUNT_DATAINDEX]:"用户账号",
    [ROLE_DATAINDEX]:"用户类型",
    [FREEZE_DATAINDEX]:"用户状态",
    [OPREATION_ROW_KEY]:"操作"
  },
  enums:{
    freeze:{
      [IS_FREEZE]:"已冻结",
      [IS_NOT_FREEZE]:"未冻结"
    },
    role:{
      [ADMIN_ROLE]:"管理员",
      [COMMON_USER_ROLE]:"普通用户"
    }

  },
  operation:{
    freeze:FREEZE_BUTTON,
    limit:LIMIT_BUTTON,
    create:CREATE_BUTTON
  }
};
/*
*
* */


/*
*
*
* */
const CONFIG_TITLE=<span><JoIcon type="setting"/>&nbsp;用户相关设置</span>

const CONFIG_BUTTON="保存修改"

const CONFIG_DESCRIPTION="用户最大尝试连接数"

const NOTIFICATION_MESSAGE="修改成功"

export const configPanelTextConfig={
  title:CONFIG_TITLE,
  description:CONFIG_DESCRIPTION,
  button:CONFIG_BUTTON,
  notification:NOTIFICATION_MESSAGE
}


