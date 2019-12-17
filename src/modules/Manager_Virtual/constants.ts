/**
 * Created by jojo on 2017/9/5.
 */



export const NAMESPACE = "managerVirtual";


export const ID_DATAINDEX = "honeypotId",
  HOST_IP_DATAINDEX = "hostIp",
  HONEYPOT_IP_DATAINDEX = "honeypotIp",
  HONEYPOT_NAME_DATAINDEX = "honeypotName",
  HONEYPOT_STATUS_DATAINDEX = "honeypotStatus",
  INTERCATION_DATAINDEX = "interaction",
  SERVICES_DATAINDEX = "services",
  SYSTEM_DATAINDEX = "system",
  PORTS_DATAINDEX = "ports";

export const HONEYPOT_TYPE_ROW_KEY = 'honeypotType';
export const OPERATION_ROW_KEY = "operation";

export const tableRowDataIndexes = [
  HOST_IP_DATAINDEX,
  HONEYPOT_IP_DATAINDEX,
  HONEYPOT_NAME_DATAINDEX,
  HONEYPOT_TYPE_ROW_KEY,
  SERVICES_DATAINDEX,
  PORTS_DATAINDEX,
  HONEYPOT_STATUS_DATAINDEX,
  OPERATION_ROW_KEY
]

export const tableTextConfig = {
  colTitles: {
    [HOST_IP_DATAINDEX]: "主機IP",
    [HONEYPOT_IP_DATAINDEX]: "蜜罐IP",
    [HONEYPOT_NAME_DATAINDEX]: "蜜罐名稱",
    [HONEYPOT_TYPE_ROW_KEY]: "蜜罐類型",
    [HONEYPOT_STATUS_DATAINDEX]: "蜜罐狀態",
    [OPERATION_ROW_KEY]: "操作",
    [SERVICES_DATAINDEX]: "服務支持",
    [PORTS_DATAINDEX]: "端口支持"
  }
}

export const STATUS_ERROR_VALUE = "abnormal",
  STATUS_LICENCE_OVERDUE = "overdue",
  STATUS_STOP_VALUE = "off",
  STATUS_RUNNING_VALUE = "run";


export const OPERATION_SHUTDOWN_VALUE = 0,
  OPERATION_START_VALUE = 1,
  OPERATION_INIT_VALUE = -1;

export const honeypotStatusTextConfig = {
  [STATUS_ERROR_VALUE]: "異常",
  [STATUS_LICENCE_OVERDUE]: "主機授權已過期",
  [STATUS_RUNNING_VALUE]: "正在運行",
  [STATUS_STOP_VALUE]: "已關機"
}

export const honeypotStatusValues = Object.keys(honeypotStatusTextConfig);

export const VCPUS_DATAINDEX = "vcpus",
  RAM_DATAINDEX = "ram",
  GATEWAY_DATAINDEX = "gateway",
  SUBNET_DATAINDEX = "subNet",
  AUTH_DATAINDEX = "auth",
  AUTH_USER_DATA_INDEX = "authUserName",
  AUTH_PASSWORD_DATA_INDEX = "authPassword"


export const honeypotTextConfig = {
  ...tableTextConfig.colTitles,
  [VCPUS_DATAINDEX]: "蜜罐虛擬CPU數",
  [RAM_DATAINDEX]: "蜜罐運行內存",
  [GATEWAY_DATAINDEX]: "蜜罐網關",
  [SUBNET_DATAINDEX]: "子網掩碼",
  [INTERCATION_DATAINDEX]: "蜜罐類型",
  [SYSTEM_DATAINDEX]: "操作系統",
  [SERVICES_DATAINDEX]: "服務支持",
  [AUTH_DATAINDEX]: "802.1x認證",
  [AUTH_USER_DATA_INDEX]: "用戶名",
  [AUTH_PASSWORD_DATA_INDEX]: "密碼"
}

export const VM_ENUM_CONFIG_DATA_INDEX = "vm",
  HIGH_DATA_INDEX = "high",
  LOW_DATA_INDEX = "low",
  SYSTEM_LIST_DATA_INDEX = "systemList",
  WINDOW_SERVER_TYPE = "windows",
  LINUX_SERVER_TYPE = "linux",
  SERVICE_LIST_DATA_INDEX = "serviceList"


// export { NAMESPACE as MAIN_NAMESPACE } from '../Main/ConstConfig.js'

// export { NODE } from 'configs/ConstConfig'