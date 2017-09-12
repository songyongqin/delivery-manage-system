/**
 * Created by jojo on 2017/9/5.
 */
/*
*  攻击阶段枚举值
* */
const SCAN="scan",
      INVADE="invade",
      INSTALL="install",
      CONTROL="control";

export const attackStage=[
  SCAN,
  INVADE,
  INSTALL,
  CONTROL
];

export const attackStageTextConfig={
  [SCAN]:"扫描",
  [INVADE]:"入侵",
  [INSTALL]:"安装",
  [CONTROL]:"控制"
};
/***********************************************************************************************************/
/*
*  威胁等级枚举值
* */
const HIGH="high",
      MIDDLE="middle",
      LOW="low";

export const level=[HIGH,MIDDLE,LOW];

export const levelTextConfig={
  [HIGH]:"高危",
  [MIDDLE]:"中危",
  [LOW]:"低危"
};
/***********************************************************************************************************/
/*
*  操作状态枚举值
* */
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
};
/***********************************************************************************************************/


const action=[];

/***********************************************************************************************************/


const attackEventType=[];

/***********************************************************************************************************/

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

export const ROLE_DATAINDEX="role";
export const ADMIN_ROLE=1,COMMON_USER_ROLE=2;
export const USERACCOUNT_DATAINDEX="userAccount";

/*********************************************************************/

const SSH_SERVICE="SSHService",
      TELNET_SERVICE="TelnetService",
      DATABASE_SERVICE="DatabaseService",
      INDUSTRIAL_CONTROL_SERVICE="IndustrialControlService";


export const services=[SSH_SERVICE,TELNET_SERVICE,DATABASE_SERVICE,INDUSTRIAL_CONTROL_SERVICE]


export const servicesTextConfig={
  [SSH_SERVICE]:"SSH服务",
  [TELNET_SERVICE]:"Telnet服务",
  [DATABASE_SERVICE]:"数据库服务",
  [INDUSTRIAL_CONTROL_SERVICE]:"工控服务"
}


const HIGH_INTERATION="highInteraction";
const LOW_INTERACTION="lowInteration";

export const interactions=[HIGH_INTERATION,LOW_INTERACTION];

export const interactionsTextConfig={
  [HIGH_INTERATION]:"高交互",
  [LOW_INTERACTION]:"低交互"
}

const WIN7_SYS="win7";
const WIN_XP_SYS="winxp";
const NEO_KYLIN_SYS="neoKylin";


export const systems=[WIN7_SYS,WIN_XP_SYS,NEO_KYLIN_SYS];

export const systemsTextConfig={
  [WIN_XP_SYS]:"Windows 7",
  [WIN_XP_SYS]:"Windows XP",
  [NEO_KYLIN_SYS]:"中标麒麟"
}
