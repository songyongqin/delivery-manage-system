export const NAMESPACE = "analyseOverallNet"

export {
  HIGH,
  MIDDLE,
  LOW,
  levelTextConfig,
  ACTIONSTATUS_SUCCESS,
  ACTIONSTATUS_UNKNOW,
  ACTIONSTATUS_FAIL,
  actionStatusTextConfig,
  level,
  actionStatus,
} from '../../configs/ConstConfig';

export const SCAN = "scan",
  INVADE = "invade",
  INSTALL = "install",
  INTENTION = "intention"

export const attackStageTextConfig = {
  [SCAN]: "扫描",
  [INVADE]: "入侵",
  [INSTALL]: "安装",
  [INTENTION]: "意图"
}

export const attackStage = Object.keys(attackStageTextConfig)


export const ATTACK_TIME_DATA_INDEX = "attackTimes",
  ATTACK_STAGE_DATA_INDEX = "attackStage",
  ACTION_STATUS_DATA_INDEX = "actionStatus",
  LEVEL_DATA_INDEX = "level",
  SOURCE_IP_DATA_INDEX = "sourceIp",
  SOURCE_PORT_DATA_INDEX = "sourcePort",
  TARGET_IP_DATA_INDEX = "targetIp",
  TARGET_PORT_DATA_INDEX = "targetPort",
  DETAILS_DATA_INDEX = "details",
  ACTION_DATA_INDEX = "action",
  TOOL_DATA_INDEX = "tool",
  PCAP_DATA_INDEX = "pcap"

export const dataIndexes = [
  ATTACK_TIME_DATA_INDEX,
  ATTACK_STAGE_DATA_INDEX,
  SOURCE_IP_DATA_INDEX,
  SOURCE_PORT_DATA_INDEX,
  TARGET_IP_DATA_INDEX,
  TARGET_PORT_DATA_INDEX,
  ACTION_STATUS_DATA_INDEX,
  TOOL_DATA_INDEX,
  LEVEL_DATA_INDEX,
  PCAP_DATA_INDEX
]


export const textConfig = {
  [ATTACK_TIME_DATA_INDEX]: "攻击时间",
  [SOURCE_IP_DATA_INDEX]: "攻击源IP",
  [SOURCE_PORT_DATA_INDEX]: "攻击源端口",
  [TARGET_IP_DATA_INDEX]: "被攻击IP",
  [TARGET_PORT_DATA_INDEX]: "被攻击端口",
  [ATTACK_STAGE_DATA_INDEX]: "攻击阶段",
  [ACTION_DATA_INDEX]: "网络行为",
  [TOOL_DATA_INDEX]: "攻击武器",
  [LEVEL_DATA_INDEX]: "威胁等级",
  [ACTION_STATUS_DATA_INDEX]: "操作状态",
  [PCAP_DATA_INDEX]: "PCAP"
}

export { EVENT_ACTION_DATA_INDEX, EVENT_TYPE_DATA_INDEX } from '../../configs/ConstConfig';

export { NAMESPACE as MAIN_NAMESPACE } from '../Main/ConstConfig';