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
              INTERCATION_DATAINDEX="interaction",
              SERVICES_DATAINDEX="services",
              SYSTEM_DATAINDEX="system",
              PORTS_DATAINDEX="ports";

export const HONEYPOT_TYPE_ROW_KEY='honeypotType';
export const OPERATION_ROW_KEY="operation";

export const tableRowDataIndexes=[
  HOST_IP_DATAINDEX,
  HONEYPOT_IP_DATAINDEX,
  HONEYPOT_NAME_DATAINDEX,
  HONEYPOT_TYPE_ROW_KEY,
  SERVICES_DATAINDEX,
  PORTS_DATAINDEX,
  HONEYPOT_STATUS_DATAINDEX,
  OPERATION_ROW_KEY
]

export const tableTextConfig={
  colTitles:{
    [HOST_IP_DATAINDEX]:"主机IP",
    [HONEYPOT_IP_DATAINDEX]:"蜜罐IP",
    [HONEYPOT_NAME_DATAINDEX]:"蜜罐名称",
    [HONEYPOT_TYPE_ROW_KEY]:"蜜罐类型",
    [HONEYPOT_STATUS_DATAINDEX]:"蜜罐状态",
    [OPERATION_ROW_KEY]:"操作",
    [SERVICES_DATAINDEX]:"服务支持",
    [PORTS_DATAINDEX]:"端口支持"
  }
}

export const  STATUS_ERROR_VALUE="abnormal",
              STATUS_LICENCE_OVERDUE="overdue",
              STATUS_STOP_VALUE="off",
              STATUS_RUNNING_VALUE="run";


export const honeypotStatusTextConfig={
  [STATUS_ERROR_VALUE]:"异常",
  [STATUS_LICENCE_OVERDUE]:"主机授权已过期",
  [STATUS_RUNNING_VALUE]:"正在运行",
  [STATUS_STOP_VALUE]:"已关机"
}

export const honeypotStatusValues=Object.keys(honeypotStatusTextConfig);

export const VCPUS_DATAINDEX="vcpus",
              RAM_DATAINDEX="ram",
              GATEWAY_DATAINDEX="gateway",
              AUTH_DATAINDEX="auth";


export const honeypotTextConfig={
  ...tableTextConfig.colTitles,
  [VCPUS_DATAINDEX]:"蜜罐虚拟CPU数",
  [RAM_DATAINDEX]:"蜜罐运行内存",
  [GATEWAY_DATAINDEX]:"蜜罐网关",
  [INTERCATION_DATAINDEX]:"蜜罐类型",
  [SYSTEM_DATAINDEX]:"操作系统",
  [SERVICES_DATAINDEX]:"服务支持",
  [AUTH_DATAINDEX]:"802.1x认证"
}