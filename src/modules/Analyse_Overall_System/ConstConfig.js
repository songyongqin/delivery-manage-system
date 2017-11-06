export const NAMESPACE = "analyseOverallSystem"

export {
  attackStage,
  attackStageTextConfig,
  level,
  levelTextConfig,
  actionStatus,
  actionStatusTextConfig,
  ACTIONSTATUS_SUCCESS,
  ACTIONSTATUS_FAIL,
} from '../../configs/ConstConfig'

export const HONEYPOT_IP_DATA_INDEX = "honeypotIp",
  PATH_DATA_INDEX = "path",
  DETAILS_DATA_INDEX = "details",
  ATTACKSTAGE_DATAINDEX = "attackStage",
  ACTION_DATAINDEX = "action",
  LEVEL_DATAINDEX = "level",
  ACTIONSTATUS_DATAINDEX = "actionStatus";

export const dataIndexes = [
  HONEYPOT_IP_DATA_INDEX,
  ATTACKSTAGE_DATAINDEX,
  ACTION_DATAINDEX,
  ACTIONSTATUS_DATAINDEX,
  LEVEL_DATAINDEX,
  PATH_DATA_INDEX,
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
  [PATH_DATA_INDEX]: "操作路径"
}


export { EVENT_ACTION_DATA_INDEX, EVENT_TYPE_DATA_INDEX } from '../../configs/ConstConfig';
export { NAMESPACE as MAIN_NAMESPACE } from '../Main/ConstConfig';