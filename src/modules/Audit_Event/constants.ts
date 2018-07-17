export const NAMESPACE = "analyseOverall"


export const HONEYPOT_IP_DATA_INDEX = "honeypotIp",
  PATH_DATA_INDEX = "path",
  DETAILS_DATA_INDEX = "details",
  ATTACKSTAGE_DATAINDEX = "attackStage",
  ACTION_DATAINDEX = "action",
  LEVEL_DATAINDEX = "level",
  ACTIONSTATUS_DATAINDEX = "actionStatus";

export const TIME_DATA_INDEX = "time",
  ACTION_MAIN_DATA_INDEX = "actionMain",
  ACTION_TARGET_DATA_INDEX = "actionTarget"

export const dataIndexes = [
  TIME_DATA_INDEX,
  HONEYPOT_IP_DATA_INDEX,
  ACTION_MAIN_DATA_INDEX,

  // ATTACKSTAGE_DATAINDEX,
  ACTION_DATAINDEX,
  ACTION_TARGET_DATA_INDEX,
  // ACTIONSTATUS_DATAINDEX,
  // LEVEL_DATAINDEX,
  // PATH_DATA_INDEX,
]

// export const filters={
//   [ATTACKSTAGE_DATAINDEX]:attackStage,
//   [ACTION_STATUS_DATAINDEX]:actionStatus,
//   [LEVEL_DATAINDEX]:level,
// }

export const textConfig = {
  [HONEYPOT_IP_DATA_INDEX]: "蜜罐IP",
  [ATTACKSTAGE_DATAINDEX]: "攻击阶段",
  [ACTION_DATAINDEX]: "行为",
  [LEVEL_DATAINDEX]: "威胁等级",
  [ACTIONSTATUS_DATAINDEX]: "操作状态",
  [PATH_DATA_INDEX]: "操作路径",
  [ACTION_MAIN_DATA_INDEX]: "行为主体",
  [ACTION_TARGET_DATA_INDEX]: "行为目标",
  [TIME_DATA_INDEX]: "时间"
}