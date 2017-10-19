/**
 * Created by jojo on 2017/9/5.
 */

import React from 'react';
import JoIcon from '../../components/JoIcon';
import {
  ROLE_DATAINDEX as COMMON_ROLE_DATAINDEX,
  ADMIN_ROLE as COMMON_ADMIN_DATAINDEX,
  COMMON_USER_ROLE as COMMON_COMMON_USER_ROLE
} from '../../configs/ConstConfig';

export const NAMESPACE="userManager";
/**************************************************
 * table
 **************************************************/
export const  ROLE_DATAINDEX=COMMON_ROLE_DATAINDEX,
              USERACCOUNT_DATAINDEX="userAccount",
              FREEZE_DATAINDEX="freeze",
              DEPARTMENT_DATAINDEX="department",
              EMAIL_DATAINDEX="Email",
              PHONE_NUMBER_DATAINDEX="phoneNumber",
              USER_NAME_DATAINDEX="userName",
              REMARK_DATAINDEX="remark",
              USER_PASSWORD_DATAINDEX="userPassword"


export const LIMIT_DATAINDEX="limit";
export const LIMIT_ATTACK_DATAINDEX="attack";
export const LIMIT_CHART_DATAINDEX="chart";

export const OPERATION_ROW_KEY="operation"

export const rowDataIndexes=[
  USERACCOUNT_DATAINDEX,
  USER_NAME_DATAINDEX,
  ROLE_DATAINDEX,
  FREEZE_DATAINDEX,
  DEPARTMENT_DATAINDEX,
  EMAIL_DATAINDEX,
  PHONE_NUMBER_DATAINDEX,
  REMARK_DATAINDEX
];

const TABLE_TITLE= <span><JoIcon type="team"/>&nbsp;用户列表</span>


export const IS_FREEZE=1,IS_NOT_FREEZE=0;

export const  ADMIN_ROLE=COMMON_ADMIN_DATAINDEX,
              COMMON_USER_ROLE=COMMON_COMMON_USER_ROLE;

const FREEZE_BUTTON="解除该用户冻结";
const LIMIT_BUTTON="编辑"
const CREATE_BUTTON="添加用户";

export const tableTextConfig={
  title:TABLE_TITLE,
  rowTitles:{
    [USERACCOUNT_DATAINDEX]:"用户账号",
    [ROLE_DATAINDEX]:"用户类型",
    [FREEZE_DATAINDEX]:"用户状态",
    [OPERATION_ROW_KEY]:"操作",
    [DEPARTMENT_DATAINDEX]:"所属部门",
    [EMAIL_DATAINDEX]:"Email",
    [PHONE_NUMBER_DATAINDEX]:"联系电话",
    [USER_NAME_DATAINDEX]:"姓名",
    [REMARK_DATAINDEX]:"备注",
    [USER_PASSWORD_DATAINDEX]:"密码"
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
    create:CREATE_BUTTON,
    delete:"删除",
    reset:"重置密码"
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


const LIMIT_TITLE=<span><JoIcon type="edit1"/>&nbsp;用户信息修改</span>

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
      [LIMIT_CHART_DATAINDEX]:"图表信息统计"
    }
  }
}

const CREATE_USER_TITLE=<span><JoIcon type="plus2"/>&nbsp;添加新用户</span>

const CREATE_NOTIFICATION_MESSAGE="添加成功"

export const createUserPanelTextConfig={
  title:CREATE_USER_TITLE,
  notification:CREATE_NOTIFICATION_MESSAGE
}
