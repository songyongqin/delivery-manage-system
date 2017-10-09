/**
 * Created by jojo on 2017/10/9.
 */
/*******************************************************************/
export const NAMESPACE="threatname";


export const  THREAT_NAME_KEY_DATAINDEX="key",
  THREAT_NAME_LEVEL_DATAINDEX="level",
  THREAT_NAME_NAME_DATAINDEX="name";

export const threanameTextConfig={
  [THREAT_NAME_NAME_DATAINDEX]:"攻击行为",
  [THREAT_NAME_LEVEL_DATAINDEX]:"威胁行为",
}


export const threatnameDataIndexes=Object.keys(threanameTextConfig);

export const  LEVEL_HIGH="level",
  LEVEL_MIDDLE="middle",
  LEVEL_LOW="low"

export const levelTextConfig={
  [LEVEL_HIGH]:"高危",
  [LEVEL_MIDDLE]:"中危",
  [LEVEL_LOW]:"低危"
}

export const levels=Object.keys(levelTextConfig);





