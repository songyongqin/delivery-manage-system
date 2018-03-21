/**
 * Created by jojo on 2017/10/9.
 */
/*******************************************************************/
export const NAMESPACE = "threatname";


export const THREAT_NAME_KEY_DATAINDEX = "key",
  THREAT_NAME_LEVEL_DATAINDEX = "level",
  THREAT_NAME_NAME_DATAINDEX = "name",
  THREAT_NAME_USER_DEFINED_DATAINDEX = "isUserDefined";


export const textConfig = {
  [THREAT_NAME_NAME_DATAINDEX]: "威胁类型",
  [THREAT_NAME_LEVEL_DATAINDEX]: "威胁等级",
  [THREAT_NAME_USER_DEFINED_DATAINDEX]: ""
}


export const dataIndexes = Object.keys(textConfig);

export const LEVEL_HIGH = "high",
  LEVEL_MIDDLE = "middle",
  LEVEL_LOW = "low"

export const levelTextConfig = {
  [LEVEL_HIGH]: "高危",
  [LEVEL_MIDDLE]: "中危",
  [LEVEL_LOW]: "低危"
}


export const USER_DEFINED_VALUE = 1,
  UN_USER_DEFINED_VALUE = 0;

export const levels = Object.keys(levelTextConfig);





