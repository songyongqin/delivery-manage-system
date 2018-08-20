//本文件只为analyse-report 及对应页面使用


const AppConfig = {

  title: "安天威胁情报生产系统",

  //所有本地存储命名空间的前缀
  namespacePrefix: "@@__THREAT_INFO_SYSTEM__@@",

  //加密解密和IV(偏移量)的默认值
  commonKey: "1234567812345678",

  //该配置项决定默认状态是否加密
  crypto: false,

  //该配置项决定生产环境默认状态是否加密
  cryptoDev: false
}


export const NAMESPACE_PREFIX = AppConfig.namespacePrefix

const combineNamespace = namespace => `${NAMESPACE_PREFIX}__${namespace}`

export const CRYPTO_MODE = combineNamespace("@@__CRYPTO__@@")

export const SECRET_KEY_NAMESPACE = combineNamespace("@@__SECRET_KEY__@@")

export const IV_NAMESPACE = combineNamespace("@@__IV__@@")

export const USER_DATA_CACHE_NAMESPACE = combineNamespace("@@__USER_DATA__@@")

export const LAST_TARGET_URL = combineNamespace("@@__LAST_TARGET_URL__@@")

export const LAYOUT_INIT_STATE_CACHE_NAMESPACE = combineNamespace("@@__layoutCache__@@")


export const LAYOUT_NAMESPACE = "layout"
export const MAIN_NAMESPACE = "mainWrapper"
export const SANDBOX_NAMESPACE = "sandbox"
export const LOGIN_NAMESPACE = "login"
export const STATISTICS_NAMESPACE = "statistics"
export const DETECTION_NAMESPACE = "detection"
export const THREAT_INFO_NAMESPACE = "threatInfo"

export const FETCH_VM_ACTION = "fetchVMData",
  PUT_VM_ACTION = "putVM"

export const DARK_THEME = "dark",
  LIGHT_THEME = "light"

export const COMMON_SUCCESS_STATUS = 1

export const ACCESS_TOKEN_NAMESPACE = "access-token"

export const ADMIN_ROLE = 1,

  COMMON_ROLE = 2,

  VISIT_ROLE = 0


export const TIME_STAMP_RANGE = "timestampRange"

export const TOKEN_DATA_INDEX = "token",

  ROLE_DATA_INDEX = "role",

  TASK_ID_DATA_INDEX = "taskId"


export const isDev = () => {
  try {
    return process.env.NODE_ENV === "development"
  } catch (e) {
    return false
  }
}