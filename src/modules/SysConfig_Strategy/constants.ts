/**
 * Created by jojo on 2017/10/9.
 */
export const NAMESPACE = "strategyWrapper";

export const
  ID = "id",
  THREATTYPE = "threatType",
  PROTOCOLTYPE = "protocolType",
  RULE = "rule",
  DESCRIPTION = "description",
  THREATLEVEL = "threatLevel",
  UPDATETIME = "updateTime",
  STATUS = "status"
export const STRATEGY_OPERATION_KEY = "operation";

export const textConfig = {
  [ID]: "特征ID",
  [THREATTYPE]: "威胁类型",
  [PROTOCOLTYPE]: "协议类型",
  [RULE]: "规则",
  [DESCRIPTION]: "特征描述",
  [THREATLEVEL]: "威胁等级",
  [UPDATETIME]: "最后更新时间",
  [STATUS]: "状态",
  [STRATEGY_OPERATION_KEY]: "操作"
}

export const dataIndexes = Object.keys(textConfig);


export const USERFUL_VALUE = 1,
  UN_USEFUL_VALUE = 0;

export const SIMPLEFEATURECOUNT = "simpleFeature",
  SNORTFEATURECOUNT = "definedSnort",
  SUPPORTPROTOCOLCOUNT = "protocolCount"


export const RULE_ID_DATAINDEX = "id",
  RULE_PROTOCOLTYPE_DATAINDEX = "protocolType",
  RULE_THREAT_TYPE_DATAINDEX = "threatType",
  RULE_DATAINDEX = "rule",
  RULE_DESCRIPTION = "description";

export const RULE_OPERATION_KEY = "operation";

export const ruleTextConfig = {
  [RULE_THREAT_TYPE_DATAINDEX]: "威胁类型",
  [RULE_DATAINDEX]: "规则",
  [RULE_DESCRIPTION]: "特征描述",
  [RULE_OPERATION_KEY]: "操作",
  [RULE_PROTOCOLTYPE_DATAINDEX]: "协议类型"
}

export const ruleDataIndexes = [
  RULE_THREAT_TYPE_DATAINDEX,
  RULE_DATAINDEX,
  RULE_DESCRIPTION,
  RULE_OPERATION_KEY
]

export const HTTP = "HTTP",
  TCP = "TCP",
  SSH = "SSH",

  IP = "IP",
  DNS = "DNS",

  FTP = "FTP",
  SMTP_POP3 = "SMTP/POP3",

  SMB = "SMB"

export const protocolTypeList = [HTTP, TCP, SSH, IP, DNS, FTP, SMTP_POP3, SMB]

export const placeholderTextConfig = {
  [HTTP]: "请输入URL",
  [TCP]: "请输入ip:port",
  [SSH]: "请输入ip:port",
  [SMB]: "请输入ip:port",
  [IP]: "请输入ip",
  [DNS]: "请输入域名",
  [SMTP_POP3]: "请输入用户名或操作指令",
  [FTP]: "请输入用户名或操作指令"
}

export const URL = "url",
  SOURCE_IP_PORT = "sourceIpPort",
  TARGET_IP_PORT = "targetIpPort",
  REVEICER = "receiver",
  SENDER = "sender",
  THEME = "theme",
  SOURCE_IP = "sourceIpPort",
  TARGET_IP = "targetIpPort"

export const ruleItemPlaceholder = {
  [URL]: "部分或完整的URL",
  [SOURCE_IP_PORT]: "源ip:port",
  [TARGET_IP_PORT]: "目的ip:port",
  [REVEICER]: "收件箱",
  [SENDER]: "发件箱",
  [THEME]: "邮件主题",
  // [SOURCE_IP]: "源ip",
  // [TARGET_IP]: "目的ip"
}


export const ruleItemsConfig = {
  [HTTP]: [URL],
  [DNS]: [URL],
  [TCP]: [SOURCE_IP_PORT, TARGET_IP_PORT],
  [IP]: [SOURCE_IP_PORT, TARGET_IP_PORT],
  [SSH]: [SOURCE_IP_PORT, TARGET_IP_PORT],
  [FTP]: [SOURCE_IP_PORT, TARGET_IP_PORT],
  [SMTP_POP3]: [REVEICER, SENDER, THEME],
  [SMB]: [SOURCE_IP_PORT, TARGET_IP_PORT]
}



