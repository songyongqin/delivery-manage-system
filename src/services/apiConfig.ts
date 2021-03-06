const baseUrl = ""
// const baseUrl = ' http://172.31.50.41:7300/mock/5b3ae25f3a04b867a240d558/ids'
const HttpApiConfig = {

  AUDIT_EVENT: "/audit/basic-event",
  AUDIT_ASSETS: "/audit/assets-statistics",
  AUDIT_ASSETS_LIST: "/audit/assets-list",
  AUDIT_ASSETS_DETAIL_LOOPHLE: "/audit/assets-detail/loophole",
  AUDIT_ASSETS_DETAIL_PORT: "/audit/assets-detail/port",
  AUDIT_ASSETS_CONFIG: "/audit/assets-scan/config",
  AUDIT_ASSETS_EDIT_PORT: "/audit/assets-edit",
  AUDIT_ASSETS_RECORD: "/audit/assets-scan/record",
  AUDIT_ASSETS_NEWRECORD: "/audit/assets-scan/now-record",
  AUDIT_ASSETS_RECORD_DETAIL: "/audit/assets-scan/detail-assets",
  AUDIT_ASSETS_RECORD_PORT_DETAIL: "/audit/assets-scan/detail-port",
  AUDIT_CAUGHT_RECORD_DETAIL: "/audit/caughtrecord",
  AUDIT_CAUGHT_TASK_DETAIL: "/audit/caughttask",
  AUDIT_CAUGHT_TASK_DETAIL_NEW: "/audit/cancel-caughttask",

  ENUM_CONFIG: "/enum-config",

  USER_SIGN: "/user/sign",
  USER_PASSWORD: "/user/password",
  USER: "/user",
  USER_CONFIG: "/user/config",
  USER_IP_LIMIT: "/user/ip-limit",
  USER_ACTIVE: "/user/active",
  USER_HEART_BEAT: "/user/heart-beat",
  VERIFICATION_CODE: "/user/verification-code",

  CONFIG_SYS_CONFIG_EXPORT_NET: '/config/sys-config/export-net',

  OVERVIEW_EVENT: "/overview/event",
  // OVERVIEW_FLOW: '//overview/flow',
  OVERVIEW_LAST_EVENT: "/overview/last-event",


  TEST_EMAIL: "/warning/email/test",

  WARNING_EMAIL: "/warning/email",
  WARNING_EMAIL_CONFIG: "/warning/email/config",

  DEVICE_DISK: "/device/disk",

  DEVICE_MASTER: "/device/control",
  DEVICE_MASTER_DISK: "/device/disk",

  DEVICE_HONEYPOT: "/device/node",
  DEVICE_HONEYPOT_DISK: "/device/disk",

  DEVICE_IDS: "/device/node-ids",
  DEVICE_IDS_DISK: "/device/disk/ids",

  DEVICE_HONEYPOT_NODE: "/device/control",
  DEVICE_HONEYPOT_NODE_DISK: "/device/disk",

  DEVICE_IDS_NODE: "/device/node-ids",
  DEVICE_IDS_NODE_DISK: "/device/disk/ids",

  DEVICE_HONEYPOT_STANDALONE: "/device/control",
  DEVICE_HONEYPOT_STANDALONE_DISK: "/device/disk",

  DEVICE_IDS_STANDALONE: "/device/node-ids",
  DEVICE_IDS_STANDALONE_DISK: "/device/disk/ids",

  DEVICE_IDS_INFO: "/device/info",

  DEVICE_UPDATE_ONLINE: "/device/update/online",
  DEVICE_UPDATE_LOCAL: "/device/update/local",
  DEVICE_UPDATE_INFO_ONLINE: "/device/update-info/online",
  DEVICE_UPDATE_INFO_LOCAL: "/device/update-info/local",
  DEVICE_UPDATE_LOCAL_MERGE: "/device/update/local/merge",
  DEVICE_UPDATE_LOCAL_RESULT: "/device/update/local/result",


  DEVICE_UPDATE_ONLINE_IDS: "/device/update/online/ids",
  DEVICE_UPDATE_LOCAL_IDS: "/device/update/local/ids",
  DEVICE_UPDATE_INFO_ONLINE_IDS: "/device/update-info/online/ids",
  DEVICE_UPDATE_INFO_LOCAL_IDS: "/device/update-info/local/ids",

  VIRTUAL_MACHINE: "/virtual-machine",

  OCCUPYING_NODE_IP: "/occupying/node/ip",
  OCCUPYING_VM_IP: "/occupying/virtual-machine/ip",
  OCCUPYING_VM_NAME: "/occupying/virtual-machine/name",


  REPORT: "/report",

  ANALYSE_EVENT: "/analyse/event",
  ANALYSE_EVENT_STATISTICS: "/analyse/event/statistics",
  ANALYSE_EVENT_EXPLOIT: "/analyse/event/exploit",
  ANALYSE_EVENT_TOOL: "/analyse/event/tool",
  ANALYSE_EVENT_THREAT_INFO: "/analyse/event/threat-info",

  ANALYSE_DISTRIBUTION: "/analyse/distribution",

  ANALYSE_ATTACK_CHAIN: "/analyse/attack-chain",
  ANALYSE_FALL_HOST: "/analyse/fall-host",
  ANALYSE_RANKING_OPTION: "/analyse/ranking/option",
  ANALYSE_RANKING: "/analyse/ranking/",
  ANALYSE_OVERALL_NET_BASIC: "/analyse/overall/net-basic",
  ANALYSE_OVERALL_PCAP: "/analyse/overall/pcap",
  ANALYSE_OVERALL_CAPTURE: "/analyse/overall/capture",
  ANALYSE_OVERALL_SAMPLE: "/analyse/overall/sample",
  ANALYSE_OVERALL_SYSTEM: "/analyse/overall/system",
  ANALYSE_OVERALL_NET: "/analyse/overall/net",
  ANALYSE_OVERALL_ABNORMAL: "/analyse/overall/abnormal-net-basic",
  SYS_CONFIG_NETWORK: "/sys-config/network",
  SYS_CONFIG_STRATEGY: "/strategy/simpleFeature",
  SYS_CONFIG_DATA_STRATEGY: "/strategy/strategyData",

  SYS_CONFIG_STRATEGY_APPLY: "/sys-config/strategy/apply",
  SYS_CONFIG_STRATEGY_THREAT_NAME: "/strategy/threatType",
  SYS_CONFIG_STRATEGY_SNORT: "/strategy/snortFeature",
  SYS_CONFIG_WHITELIST_APPLY: "/sys-config/white-list/apply",

  STRATEGY_THREAT_ACTION: "/strategy/threat-action",

  SYS_CONFIG_NETWORK_MASTER: "/sys-config/network/control",

  MODULE_MONITOR: "/sys-config/module-monitor",
  MODULE_MONITOR_LOG: "/sys-config/module-monitor/log",

  CREATE_STATUS: "/virtual-machine/create-status",
  VALIDATE: "/occupying/virtual-machine/validate",


  DEVICE_LICENCE: "/device/licence",


  SYS_LOG_LOGIN: "/user/sys-log/login",


  REPORT_STATISTICS: "/report/statistics",
  REPORT_FALL_HOST: "/report/fall-host",
  REPORT_THREAT_INFO: "/report/threat-info",
  REPORT_MAL_IP: "/report/mal-ip",
  REPORT_MAL_DOMAIN: "/report/mal-domain",
  REPORT_SUFFER_HOST_CALL_ON_RECORD: "/report/suffer-host-call-on-record",
  REPORT_HAVE_COMMUNICATE_INSIDE_IP: "/report/have-communicate-inside-ip",
  REPORT_CALL_ON_IP: "/report/call-on-ip",
  REPORT_CALL_ON_DOMAIN: "/report/call-on-domain",

  // REPORT_EXPORT: "/report/export",


  SYS_LOG_CONFIG: "/sys-config/sys-log",

  MIRROR_SUMMARY: "/mirror",
  MIRROR_NODE: "/mirror/node",
  MIRROR_UPDATE_LOCAL: "/mirror/update/local",

  MIRROR_UPDATE_LOCAL_MERGE: "/mirror/update/local/merge",

  MIRROR_UPDATE_REMOTE: "/mirror/update/online",

  MIRROR_UPDATE_PROGRESS: "/mirror/update/online/progress",
  DEVICE_UPDATE_PROGRESS: "/device/update/online/progress",

  MIRROR_UPDATE_NODE: "/mirror/node/update",

  VM_OPTION: "/virtual-machine/option",


  AUTH_NETWORK_802: "/sys-config/auth-network",

  SNORT: "/snort",

  SYS_CONFIG_CLOUD_DETECTION: "/sys-config/cloud-detection",

  BASE_INFO: "/product-type",

  FILE_RESTORE: "/file-restore",

  OVERVIEW_COUNT: '/overview/count',

  OVERVIEW_FLOW: '/overview/flow',

  OVERVIEW_EVENT_VIEW: '/overview/event',

  ANALYSE_ATTACKED_VIEW: '/analyse/attacked-view',

  ANALYSE_ATTACKED_SEARCH: '/analyse/attacked-search',

  ANALYSE_ATTACKED_COUNT: '/analyse/attacked-count',

  ANALYSE_ATTACKED_DETAILS: '/analyse/attacked-details',

  ANALYSE_ATTACKED_DETAILS_CC: '/analyse/attacked-details-c2',

  ANALYSE_ATTACKER_COUNT: '/analyse/attacker-count',

  ANALYSE_ATTACKER_SEARCH: '/analyse/attacker-search',

  ANALYSE_ATTACKER_CONSTANTS: '/analyse/attacker-constants', //弃用

  ANALYSEATTACKER_DETAIL_IP: '/analyse/attacker-details-ip',

  ANALYSEATTACKER_DETAIL_THREATEN: '/analyse/attacker-details-threaten',

  ANALYSE_THREAT_FAMILY: '/analyse/threat-family',

  ANALYSE_THREAT_COUNT: '/analyse/threat-count',

  ANALYSE_THREAT_Loophole: '/analyse/threat-attack-loophole',

  ANALYSE_THREAT_FAMILY_DETAIL_EVENT: '/analyse/threat-family/detail-event',

  ANALYSE_THREAT_FAMILY_DETAIL_ASSETS: '/analyse/threat-family/detail-assets',

  ANALYSE_THREAT_FAMILY_DETAIL_CC: '/analyse/threat-family/detail-c2',

  ANALYSE_THREAT_LOOPHOLE_DETAIL_EVENT: '/analyse/threat-attack-loophole/detail-event',

  ANALYSE_THREAT_LOOPHOLE_DETAIL_ASSETS: '/analyse/threat-attack-loophole/detail-assets',

  ANALYSE_THREAT_LOOPHOLE_DETAIL_CC: '/analyse/threat-attack-loophole/detail-c2',

  ANALYSE_EVENT_VIEW_COUNT: '/analyse/event-count',

  ANALYSE_EVENT_VIEW: '/analyse/event-search',

  ANALYSE_EVENT_SEARCH_PARMAS: '/analyse/event/search/params',

  ANALYSE_REPORT_FILE: "/analyse/report/file",
  ANALYSE_REPORT_MAIL: "/analyse/report/mail",
  ANALYSE_REPORT_URL: "/analyse/report/url",
  ANALYSE_REPORT_EXPORT_URL: "/analyse/report/export",
  // ANALYSE_REPORT_DETAILT_URL: "/analyse/report/detail",
  ANALYSE_REPORT_DETAILT_URL: "/analyse/report/sample_x86_sandbox_report",
  ANALYSE_REPORT_DETAIL_EXPORT_URL: "/analyse/report/detail/export",

  REPORT_COUNT: '/report/count',

  REPORT_DETAIL: '/report/detail',

  REPORT_RANK: '/report/rank',

  REPORT_DETAIL_THREAT_THREATEVENT: '/report/detail/threatEvent',

  REPORT_DETAIL_THREAT_THREATGROUP: '/report/detail/threatGroup',

  REPORT_DETAIL_THREAT_ATTACKEDASSETS: '/report/detail/AttackedAssets',

  REPORT_DETAIL_THREAT_THREATFAMILY: '/report/detail/threatFamily',

  REPORT_DETAIL_THREAT_INTELLIGENCE: '/report/detail/threatIntelligence',

  REPORT_EXPORT: '/report/export',

  REPORT_COUNT_THREAT: '/report/count',

  REPORT_DETAIL_THREAT: '/report/detail',

  REPORT_RANK_THREAT: '/report/rank',

  NODE_MONITOR:"/node/monitor",

  WHITE_LIST: '/whiteList',

  WHITE_LIST_USE: '/whiteList/use',

  TYPICAL_CASE_LIST: '/typical-case',

  CONFIG_TIME: '/config/time',

  ANALYSE_THREAT_INTELLIGENCE_COUNT: '/analyse/threat-intelligence/count',

  ANALYSE_THREAT_INTELLIGENCE_TABLE: '/analyse/threat-intelligence/table',

  ANALYSE_THREAT_INTELLINGENCE_UPLOAD: '/analyse/threat-intelligence/upload',

  // ANALYSE_THREAT_INTELLINGENCE_UPLOAD: '/mock/uploads', //模拟

  ANALYSE_THREAT_INTELLIGENCE_INFO: '/analyse/threat-intelligence/info',


  non_x86_sandbox_report: "/analyse/report/sample_non_x86_sandbox_report",
  //syq
  // "queryDetail": "/api/query/detail",
  "queryDetail": "/analyse/report/detail",
  "get_x86_sandbox_report": "/api/query/get_x86_sandbox_report",
  "get_non_x86_sandbox_report": "/api/query/get_non_x86_sandbox_report",
  

}


const apiConfig = {
  http: Object.entries(HttpApiConfig)
    .reduce((target, [key, url]) => {
      target[key] = baseUrl + url
      return target
    }, { ...HttpApiConfig })
}

export default apiConfig

const httpApi = apiConfig.http

export const globalMessageIgnoreApiList = [httpApi.USER_SIGN]

export const delayIgnoreApiList = []