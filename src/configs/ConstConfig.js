/**
 * Created by jojo on 2017/9/5.
 */
/*
*  攻击阶段枚举值
* */
export const INVADE_DATAINDEX = "invade",
  INSTALL_DATAINDEX = "install",
  CONTROL_DATAINDEX = "control",
  INTENTION_DATAINDEX = "intention"

export const attackStage = [
  INVADE_DATAINDEX,
  INSTALL_DATAINDEX,
  CONTROL_DATAINDEX,
  INTENTION_DATAINDEX
];

export const attackStageTextConfig = {
  [INVADE_DATAINDEX]: "入侵",
  [INSTALL_DATAINDEX]: "安装",
  [CONTROL_DATAINDEX]: "控制",
  [INTENTION_DATAINDEX]: "意图",
};
/***********************************************************************************************************/
/*
*  威胁等级枚举值
* */
export const HIGH = "high",
  MIDDLE = "middle",
  LOW = "low",
  UN_KNOW = "unknow";


export const levelTextConfig = {
  [HIGH]: "高危",
  [MIDDLE]: "中危",
  [LOW]: "低危",
  // [UN_KNOW]: "未知"
};

export const level = Object.keys(levelTextConfig)
/***********************************************************************************************************/
/*
*  操作状态枚举值
* */
export const ACTIONSTATUS_SUCCESS = 1,
  ACTIONSTATUS_FAIL = 0,
  ACTIONSTATUS_UNKNOW = -1;



export const actionStatusTextConfig = {
  [ACTIONSTATUS_SUCCESS]: "成功",
  [ACTIONSTATUS_FAIL]: "失败",
  [ACTIONSTATUS_UNKNOW]: "未知"
};

export const actionStatus = Object.keys(actionStatusTextConfig)
/***********************************************************************************************************/

export const ORT_SCAN = "port scan",
  BURTE_FORCE_3306 = "burte force 3306",
  BURTE_FORCE_3389 = "burte force 3389",
  CONNECT_3306 = "connect 3306",
  CONNECT_3389 = "connect 3389",
  CONNECT_22 = "connect 22",
  CONNECT_445 = "connect 445",
  CONNECT_23 = "connect 23",
  LOGON_3306 = "logon 3306",
  LOGON_3389 = "logon 3389",
  LOGON_22 = "logon 22",
  MYSQL_SHELLCODE_INJECTION = "mysql shellcode injection",
  MYSQL_REMOTE_CODE_EXECUTE = "mysql remote code execute",
  SMB_SESSION_SETUP = "smb session setup",
  EXPLOIT_ETERNALBLUE = "Exploit EternalBlue",
  ETERNALBLUE_REMOTE_CODE_EXECUTE = "EternalBlue remote code execute",
  DOWNLOAD = "download",
  SET_REGISTRY_AUTORUN = "set registry autorun",
  SELF_DELETING_APPLICATION = "self-deleting application",
  PUT_APPICATION_TO_SYSTEM_PATH = "put appication to system path",
  BUFFER_OVERFLOW = "buffer overflow",
  CONNECT_TO_C2_SERVER = "connect to c&c server",
  HACHER_INPUT_COMMAND = "hacher input command"


export const actionTextConfig = {
  // [ORT_SCAN]: "端口扫描",
  // [BURTE_FORCE_3306]: "爆破:3306",
  // [BURTE_FORCE_3389]: "爆破:3389",
  // [CONNECT_3306]: "连接:3306",
  // [CONNECT_3389]: "连接:3389",
  // [CONNECT_22]: "连接:22",
  // [CONNECT_445]: "连接:445",
  // [CONNECT_23]: "连接:23",
  // [LOGON_3306]: "登录:3306",
  // [LOGON_3389]: "登录:3389",
  // [LOGON_22]: "登录:22",
  // [MYSQL_SHELLCODE_INJECTION]: "3306注入shellcode",
  // [MYSQL_REMOTE_CODE_EXECUTE]: " mysql远程代码执行",
  // [SMB_SESSION_SETUP]: "SMB建立会话",
  // [EXPLOIT_ETERNALBLUE]: "SMB永恒之蓝,远程注入",
  // [ETERNALBLUE_REMOTE_CODE_EXECUTE]: "永恒之蓝远程代码执行",
  // [DOWNLOAD]: "下载",
  // [SET_REGISTRY_AUTORUN]: "设置注册表自启动",
  // [SELF_DELETING_APPLICATION]: "程序自删除",
  // [PUT_APPICATION_TO_SYSTEM_PATH]: "释放EXE至系统路径",
  // [BUFFER_OVERFLOW]: "缓冲区溢出攻击",
  // [CONNECT_TO_C2_SERVER]: "连接c2服务器",
  // [HACHER_INPUT_COMMAND]: "黑客远程攻击命令输入"
}

const action = Object.keys(actionTextConfig);
/***********************************************************************************************************/


const attackEventType = [];

/***********************************************************************************************************/

export default {
  enums: {
    attackStage,
    level,
    actionStatus,
    action,
  },
  textConfig: {
    attackStage: attackStageTextConfig,
    level: levelTextConfig,
    actionStatus: actionStatusTextConfig,
    action: actionTextConfig,
  }
}

export const ROLE_DATAINDEX = "role";
export const ADMIN_ROLE = 1, COMMON_USER_ROLE = 2;
export const USERACCOUNT_DATAINDEX = "userAccount";

/*********************************************************************/

export const SSH_SERVICE = "SSH",
  TELNET_SERVICE = "TELNET",
  DATABASE_SERVICE = "DatabaseServer",
  INDUSTRIAL_CONTROL_SERVICE = "IndustrialControl";




export const servicesTextConfig = {
  [SSH_SERVICE]: "SSH服务",
  [TELNET_SERVICE]: "Telnet服务",
  [DATABASE_SERVICE]: "数据库服务",
  [INDUSTRIAL_CONTROL_SERVICE]: "工控服务"
}


export const services = Object.keys(servicesTextConfig);

export const HIGH_INTERATION = "HighInteraction",
  LOW_INTERACTION = "LowInteraction";


export const interactionsTextConfig = {
  [HIGH_INTERATION]: "高交互",
  [LOW_INTERACTION]: "低交互"
}

export const interactions = Object.keys(interactionsTextConfig);


export const WIN_7_SYS = "Windows7",
  WIN_XP_SYS = "WindowsXp",
  NEO_KYLIN_SYS = "NeoKylin",
  WIN_7_SCADA = "Windows7Scada",
  CENT_OS_65 = "CentOS65",
  CENT_OS_72 = "CentOS72",
  UBUNTU_1604 = "Ubuntu1604";


export const systemsTextConfig = {
  [WIN_7_SYS]: "Windows 7",
  [WIN_XP_SYS]: "Windows XP",
  [NEO_KYLIN_SYS]: "中标麒麟",
  [WIN_7_SCADA]: "Windows 7 Scada",
  [CENT_OS_65]: "CentOS 6.5",
  [CENT_OS_72]: "CentOS 7.2",
  [UBUNTU_1604]: "Ubantu 16.04"
}

export const systems = Object.keys(systemsTextConfig);


/******************************/

export const STAND_ALONE = "standAlone",
  DISTRIBUTION = "distribution",
  IDS = "ids",
  NODE = "node",

  IDS_STAND_ALONE = "ids_stand_alone"




export const EVENT_ACTION_DATA_INDEX = "eventAction",
  EVENT_TYPE_DATA_INDEX = "eventType"


export const DEBUG_MODE = "@@__DEBUG__@@"

export const SECRET_KEY_NAMESPACE = "@@__SECRET_KEY__@@"

export const IV_NAMESPACE = "@@__IV__@@"


export const LOG_NAMESPACE = "@@__LOG__@@"