/**
 * Created by jojo on 2017/9/5.
 */

import React from 'react';
import JoIcon from '../../components/JoIcon';


export const NAMESPACE="userManager";
/**************************************************
 * table
 **************************************************/
export const  ROLE_DATAINDEX="role",
              USERACCOUNT_DATAINDEX="userAccount",
              FREEZE_DATAINDEX="freeze";



export const LIMIT_DATAINDEX="limit";
export const LIMIT_ATTACK_DATAINDEX="attack";
export const LIMIT_CHART_DATAINDEX="chart";


export const OPREATION_ROW_KEY="operation"

export const rowDataIndexes=[
  USERACCOUNT_DATAINDEX,
  ROLE_DATAINDEX,
  FREEZE_DATAINDEX,
];

const TABLE_TITLE= <span><JoIcon type="team"/>&nbsp;用户列表</span>


export const IS_FREEZE=1,IS_NOT_FREEZE=0;

export const ADMIN_ROLE=1,COMMON_USER_ROLE=2;

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

const CONFIG_NOTIFICATION_MESSAGE="修改成功"

export const configPanelTextConfig={
  title:CONFIG_TITLE,
  description:CONFIG_DESCRIPTION,
  button:CONFIG_BUTTON,
  notification:CONFIG_NOTIFICATION_MESSAGE
}


const LIMIT_TITLE=<span><JoIcon type="setting"/>&nbsp;用户权限设置</span>

const LIMIT_BASIC_TITLE="基础信息";


const LIMIT_REPORT_TITLE="威胁报告"

export const IS_OPEN_VALUE=1;
export const IS_NOT_OPEN_VALUE=0;
export const limitRowDataIndexes=[
  LIMIT_ATTACK_DATAINDEX,
  LIMIT_CHART_DATAINDEX
]

export const limitPanelTextConfig={
  title:LIMIT_TITLE,
  basic:{
    title:LIMIT_BASIC_TITLE,
    rows:{
      [USERACCOUNT_DATAINDEX]:"用户账号",
    }
  },
  threat:{
    title:LIMIT_REPORT_TITLE,
    rows:{
      [LIMIT_ATTACK_DATAINDEX]:"攻击信息统计",
      [LIMIT_CHART_DATAINDEX]:"图标信息统计"
    }
  }
}

const CREATE_USER_TITLE=<span><JoIcon type="plus2"/>&nbsp;添加新用户</span>

const CREATE_NOTIFICATION_MESSAGE="添加成功"

export const createUserPanelTextConfig={
  title:CREATE_USER_TITLE,
  notification:CREATE_NOTIFICATION_MESSAGE
}
