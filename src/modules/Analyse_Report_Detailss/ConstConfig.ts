export const NAMESPACE: string = "report",
FILE_REPORT: string = "file_report"


export const TARGET_DATA_INDEX = "target",
  BASIC_INFO_DATA_INDEX = "basic_info",
  FILE_NAME_DATA_INDEX = "fileName",
  BEHAVIOR_DATA_INDEX = "behavior",
  DANGER_BEHAVIOR_DATA_INDEX = "danger_behavior",
  CORE_BEHAVIOR_DATA_INDEX = "core_behavior",
  OTHER_BEHAVIOR_DATA_INDEX = "other_behavior",
  BASIC_BEHAVIOR_DATA_INDEX = "basic_behavior",
  PROCESS_BEHAVIOR_DATA_INDEX = "process_behavior",
  PROCESS_INFO_DATA_INDEX = "process_info",
  PROCESS_TREE_DATA_INDEX = "process_tree",
  REG_BEHAVIOR_DATA_INDEX = "reg_behavior",
  SCAN_DATA_INDEX = "scan",
  MUTEX_DATA_INDEX = "mutex",
  FILE_BEHAVIOR_DATA_INDEX = "file_behavior",
  REG_KEY_ONLY_DATA_INDEX = "reg_key_only",
  REG_VALUE_ONLY_DATA_INDEX = "reg_value_only",
  FILE_SCAN_DATA_INDEX = "filescan",

  ENGINE_DETECT_DATA_INDEX = "enginedetect",

  SCAN_ENGINE_DATA_INDEX = "scanengine",

  AVL_ENGINE = "avl",

  YARA_ENGINE = "yarafile",

  STATIC_INFO_DATA_INDEX = "static_info",

  DOC_STRUCTURE_DATA_INDEX = "docstruct",

  PE_STRUCTURE_DATA_INDEX = "pestruct",

  STRINGS_DATA_INDEX = "strings",

  NETWORK_DATA_INDEX = "network",

  SUMMARY_DATA_INDEX = "summary",

  ANALYSE_ENV_DATA_INDEX = "analysis_environment",

  ANALYSE_STATUS_DATA_INDEX = "analysis_status",

  DETECT_RESULTS_DATA_INDEX = "detect_results",


  PROTOCOL_ANALYSIS = "protocol_analysis",

  NAME_SCAN_DATA_INDEX = "namescan",

  NAME_SCAN_DETECT_RESULTS = "detect_results"

export const SIZE_DATA_INDEX = "size",
  MD5_DATA_INDEX = "md5",
  FORMAT_DATA_INDEX = "format",
  START_TIME_DATA_INDEX = "starttime",
  JUDGE_DATA_INDEX = "judge",
  THREAT_TYPE_DATA_INDEX = "threattype",
  // TAGS_DATA_INDEX = "tags",
  THREAT_NAME_DATA_INDEX = "threatname",

  SUMMARY_DESCRIPTION = "summary_describe"

export const basicPanelTextConfig = {
  [FILE_NAME_DATA_INDEX]: "文件名称",
  [SIZE_DATA_INDEX]: "大小",
  [MD5_DATA_INDEX]: "md5",
  [FORMAT_DATA_INDEX]: "文件格式",
  [START_TIME_DATA_INDEX]: "分析时间",
  [ANALYSE_ENV_DATA_INDEX]: "分析环境",
  [JUDGE_DATA_INDEX]: "恶意判定",
  [THREAT_NAME_DATA_INDEX]: "病毒名称",
  [THREAT_TYPE_DATA_INDEX]: "威胁类型",
  [SUMMARY_DESCRIPTION]: "描述"
}

export const basicInfoDataIndexes = [
  SIZE_DATA_INDEX,
  FILE_NAME_DATA_INDEX,
  MD5_DATA_INDEX,
  FORMAT_DATA_INDEX,
  START_TIME_DATA_INDEX,
  JUDGE_DATA_INDEX,
  THREAT_TYPE_DATA_INDEX,
  THREAT_NAME_DATA_INDEX,
  ANALYSE_ENV_DATA_INDEX
]

export const DES_DATA_INDEX = "description",
  LEVEL_DATA_INDEX = "level",
  INFO_DATA_INDEX = "info",

  DETAILS_DATA_INDEX = "details",

  NAME_DATA_INDEX = "name",
  VALUE_DATA_INDEX = "value"

export const behaviorDataIndexes = [
  DES_DATA_INDEX,
  LEVEL_DATA_INDEX,
  INFO_DATA_INDEX
]
export const behaviorTextConfig = {
  [DES_DATA_INDEX]: "行为描述",
  [LEVEL_DATA_INDEX]: "威胁等级",
  [INFO_DATA_INDEX]: "附加信息"
}