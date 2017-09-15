/**
 * Created by jojo on 2017/9/5.
 */

import React from 'react';
import JoIcon from '../../components/JoIcon';


export const NAMESPACE="managerVirtual";


export const  ID_DATAINDEX="id",
              HOST_IP_DATAINDEX="hostIp",
              HONEYPOT_IP_DATAINDEX="honeypotIp",
              HONEYPOT_NAME_DATAINDEX="honeypotName",
              HONEYPOT_STATUS_DATAINDEX="honeypotStatus",
              INTERCATION_DATAINDEX="interation",
              SERVICES_DATAINDEX="services",
              SYSTEM_DATAINDEX="system";

export const HONEYPOT_TYPE_ROW_KEY='honeypotType';
export const OPERATION_ROW_KEY="operation";

export const tableRowDataIndexes=[
  HOST_IP_DATAINDEX,
  HONEYPOT_IP_DATAINDEX,
  HONEYPOT_NAME_DATAINDEX,
  HONEYPOT_TYPE_ROW_KEY,
  HONEYPOT_STATUS_DATAINDEX,
  OPERATION_ROW_KEY
]

export const tableTextConfig={
  rowTitles:{
    [HOST_IP_DATAINDEX]:"主机IP",
    [HONEYPOT_IP_DATAINDEX]:"蜜罐IP",
    [HONEYPOT_NAME_DATAINDEX]:"蜜罐名称",
    [HONEYPOT_TYPE_ROW_KEY]:"蜜罐类型",
    [HONEYPOT_STATUS_DATAINDEX]:"蜜罐状态",
    [OPERATION_ROW_KEY]:"操作"
  }
}

const STATUS_ERROR_VALUE=-2,
      STATUS_LICENCE_OVERDUE=-1,
      STATUS_STOP_VALUE=0,
      STATUS_RUNNING_VALUE=1;

export const honeypotStatusValues=[
  STATUS_RUNNING_VALUE,
  STATUS_STOP_VALUE,
  STATUS_LICENCE_OVERDUE,
  STATUS_ERROR_VALUE,
]

export const honeypotStatusTextConfig={
  [STATUS_ERROR_VALUE]:"异常",
  [STATUS_LICENCE_OVERDUE]:"主机授权已过期",
  [STATUS_RUNNING_VALUE]:"正在运行",
  [STATUS_STOP_VALUE]:"已关机"
}
