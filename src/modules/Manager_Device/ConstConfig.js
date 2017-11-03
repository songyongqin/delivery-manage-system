/**
 * Created by jojo on 2017/9/5.
 */

import React from 'react';
import JoIcon from '../../components/JoIcon';


export const NAMESPACE = "managerDevice";



export const HOST_IP_DATAINDEX = "hostIp",
  DISK_PER_DATAINDEX = "diskPer",
  LICENCE_STATUS_DATAINDEX = "licenceStatus",
  LIBRARY_VERSION_DATAINDEX = "libraryVersion",
  APPLIACTION_VERSION_DATAINDEX = "applicationVersion",

  ID_DATAINDEX = "id",

  DEVICE_ID_DATAINDEX = "deviceId",

  DEVICE_PROPS_DATAINDEX = "deviceProps",


  LICENCE_STATUS_VALUE_DATAINDEX = "value",
  LICENCE_STATUS_EXPIRATION_DATAINDEX = "expiration",


  LIBRARY_VERSION_LIST_DATAINDEX = "libraryVersionList",


  ENGINE_VERSION_LIST_DATAINDEX = "engineVersionList",

  CONNECT_STATUS_DATAINDEX = "connectStatus"




export const OPERATION_ROW_KEY = "operaion";

export const deviceRowDataIndexes = [
  HOST_IP_DATAINDEX,
  DISK_PER_DATAINDEX,
  DEVICE_PROPS_DATAINDEX,
  LICENCE_STATUS_DATAINDEX,
  CONNECT_STATUS_DATAINDEX,
  APPLIACTION_VERSION_DATAINDEX,
  LIBRARY_VERSION_LIST_DATAINDEX,
  ENGINE_VERSION_LIST_DATAINDEX
]


export const tableTextConfig = {
  colTitles: {
    [HOST_IP_DATAINDEX]: "主机IP",
    [DISK_PER_DATAINDEX]: "磁盘占用情况",
    [DEVICE_PROPS_DATAINDEX]: "设备属性",
    [LICENCE_STATUS_DATAINDEX]: "授权状态",
    [APPLIACTION_VERSION_DATAINDEX]: "程序版本",
    [LIBRARY_VERSION_DATAINDEX]: "库版本",
    [OPERATION_ROW_KEY]: "操作",
    [LIBRARY_VERSION_LIST_DATAINDEX]: "库版本",
    [ENGINE_VERSION_LIST_DATAINDEX]: "引擎版本",
    [CONNECT_STATUS_DATAINDEX]: "连接状态"
  }
}

export const CONNECT = 1,
  CONNECT_ERROR = -1;

export const connectTextConfig = {
  [CONNECT]: "连接正常",
  [CONNECT_ERROR]: "连接异常"
}

const PROP_NODE = "node",
  PROP_CONTROL = "control",
  PROP_STANDALONE = "standalone";

export const devicePropsTextConfig = {
  [PROP_CONTROL]: "控制中心",
  [PROP_STANDALONE]: "单机版蜜罐",
  [PROP_NODE]: "蜜罐节点"
}

export const CONTROL_PANEL_TITLE = "控制中心设备";

export const NODE_PANEL_TITLE = "蜜罐节点设备";


export const LICENCE_OVERDUE_VALUE = -1;
export const LICENCE_VALID_VALUE = 1;
export const LICENCE_NULL_VALUE = 0;

export const licenceValueTextConfig = {
  [LICENCE_OVERDUE_VALUE]: "授权已过期",
  [LICENCE_VALID_VALUE]: "已授权",
  [LICENCE_NULL_VALUE]: "未授权"
}


export const VERSION_DATAINDEX = "version",
  NAME_DATAINDEX = "name";


export const CODE_DATAINDEX = "code"