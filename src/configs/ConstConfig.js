/**
 * Created by jojo on 2017/9/5.
 */


const SCAN="scan",
      INVADE="invade",
      INSTALL="install",
      CONTROL="control";

export const attackStage=[
  SCAN,
  INVADE,
  INSTALL,
  CONTROL
]

export const attackStageTextConfig={
  [SCAN]:"扫描",
  [INVADE]:"入侵",
  [INSTALL]:"安装",
  [CONTROL]:"控制"
}
/***********************************************************************************************************/
const HIGH="high",
      MIDDLE="middle",
      LOW="low";

export const level=[HIGH,MIDDLE,LOW]

export const levelTextConfig={
  [HIGH]:"高危",
  [MIDDLE]:"中危",
  [LOW]:"低危"
}
/***********************************************************************************************************/
const ACTIONSTATUS_SUCCESS=1,
      ACTIONSTATUS_FAIL=0,
      ACTIONSTATUS_UNKNOW=-1;

export const actionStatus=[
  ACTIONSTATUS_SUCCESS,
  ACTIONSTATUS_FAIL,
  ACTIONSTATUS_UNKNOW
];

export const actionStatusTextConfig={
  [ACTIONSTATUS_SUCCESS]:"成功",
  [ACTIONSTATUS_FAIL]:"失败",
  [ACTIONSTATUS_UNKNOW]:"未知"
}
/**********************************************************/

const action=[]


export default {
  enums:{
    attackStage,
    level,
    actionStatus,
    action,
  },
  textConfig:{
    attackStage:attackStageTextConfig,
    level:levelTextConfig,
    actionStatus:actionStatusTextConfig
  }
}
