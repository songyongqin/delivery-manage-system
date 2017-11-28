/**
 * Created by jojo on 2017/9/30.
 */

export const NAMESPACE = "network";
export const SYS_LOG_CONFIG_NAMESPACE = "sysLogConfig"
export const CONTROL_CONFIG_NAMESPACE = "controlConfig"

export const DNS_DATAINDEX = "dns",
  ADAPTER_LIST_DATAINDEX = "adapterList",

  ADAPTER_NAME_DATAINDEX = "adapterName",
  ADAPTER_MAC_DATAINDEX = "adapterMac",
  ADAPTER_IP_DATAINDEX = "adapterIp",
  ADAPTER_MAS_DATAINDEX = "adapterMas",
  ADAPTER_GW_DATAINDEX = "adapterGW",
  ADAPTER_STATUS_DATAINDEX = "adapterStatus";

export const adapterTextConfig = {
  // [ADPATER_NAME_DATAINDEX]:"",
  // [ADPATER_MAC_DATAINDEX]:"",
  [ADAPTER_IP_DATAINDEX]: "IP",
  [ADAPTER_MAS_DATAINDEX]: "子网掩码",
  [ADAPTER_GW_DATAINDEX]: "网关",
  // [ADPATER_STATUS_DATAINDEX]:"adapterStatus"
}

export const dnsTextConfig = {
  [DNS_DATAINDEX]: ""
}


export const STATUS_CONNECT = 1,
  STATUS_UN_CONNECT = 0

export const adapterStatusTextConfig = {
  [STATUS_CONNECT]: "已连接",
  [STATUS_UN_CONNECT]: "未连接"
}


export const DNS_CONFIG_TITLE = "DNS配置";

export const DNS_NETWORK_TITLE = "网络配置";


export const SYS_LOG_NETWORK_TITLE = "SYS-LOG服务器网络配置"


export const ENABLED_DATA_INDEX = "enabled",
  SERVER_IP_DATA_INDEX = "serverIp",
  SERVER_PORT_DATA_INDEX = "serverPort"


export const sysLogServerFormTextConfig = {
  [ENABLED_DATA_INDEX]: "上传 SYS-LOG",
  [SERVER_IP_DATA_INDEX]: "SYS-LOG 服务器IP",
  [SERVER_PORT_DATA_INDEX]: "SYS-LOG 服务器端口"
}