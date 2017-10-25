export const NAMESPACE = "monitor"
export const MODULE_MONITOR_DATA_INDEX = "moduleMonitor"
export { NAMESPACE as MAIN_NAMESPACE } from '../Main/ConstConfig'


export const MONITOR_PERIOD_DATA_INDEX = "period",
    MODULE_LIST_DATA_INDEX = "moduleList"




export const MONITOR_LOG_TIME_DATA_INDEX = "time",
    MONITOR_LOG_IP_DATA_INDEX = "ip",
    MONITOR_LOG_RESULT_DATA_INDEX = "result",

    ERROR_MODULE_ROW_KEY = "error",
    REGULAR_MODULE_ROW_KEY = "regular",


    ERROR_VALUE = -1,
    REGULAR_VALUE = 1

export const commonDataIndexes = [
    MONITOR_LOG_TIME_DATA_INDEX,
    // MONITOR_LOG_RESULT_DATA_INDEX,
    REGULAR_MODULE_ROW_KEY,
    ERROR_MODULE_ROW_KEY
]

export const nodeDataIndexes = [
    MONITOR_LOG_TIME_DATA_INDEX,
    MONITOR_LOG_IP_DATA_INDEX,
    // MONITOR_LOG_RESULT_DATA_INDEX,
    REGULAR_MODULE_ROW_KEY,
    ERROR_MODULE_ROW_KEY
]

export const monitorLogTextConfig = {
    [MONITOR_LOG_TIME_DATA_INDEX]: "检测时间",
    [MONITOR_LOG_IP_DATA_INDEX]: "节点IP",
    [MONITOR_LOG_RESULT_DATA_INDEX]: "检测模块",
    [REGULAR_MODULE_ROW_KEY]: "检测正常的模块",
    [ERROR_MODULE_ROW_KEY]: "检测到异常的模块"
}


export const monitorFormTextConfig = {
    [MONITOR_PERIOD_DATA_INDEX]: "自检周期",
    [MODULE_LIST_DATA_INDEX]: "检测模块"
}

export const MONITOR_SETTING_TITLE = "自检周期与模块检测设置"

