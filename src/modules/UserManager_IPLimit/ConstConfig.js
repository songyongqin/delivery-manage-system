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

export const NAMESPACE="ipLimit";
/**************************************************
 * table
 **************************************************/
export const  OPEN_DATAINDEX="open",
              IPLIMIT_DATAINDEX="ipLimit",
              ADMIN_LIMIT_DATAINDEX="admin",
              COMMON_LIMIT_DATAINDEX="common"

export const roleTextConfig={
  [ADMIN_LIMIT_DATAINDEX]:"管理员",
  [COMMON_LIMIT_DATAINDEX]:"普通用户"
}

export const OPERATION_KEY="operation";

export const IP_RANGE_DATAINDEX="ipRange",ROLE_DATAINDEX="role"

export const dataIndexes=[
  ROLE_DATAINDEX,
  IP_RANGE_DATAINDEX,
  OPERATION_KEY,
]


export const textConfig={
  [IP_RANGE_DATAINDEX]:"登录IP范围",
  [ROLE_DATAINDEX]:"用户分类",
  [OPERATION_KEY]:"操作"
}

export const IS_OPEN=1,
             IS_NOT_OPEN=0;
