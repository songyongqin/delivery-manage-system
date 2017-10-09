export const NAMESPACE="rule";

export const RULE_ID_DATAINDEX="id",
  RULE_PROTOCOLTYPE_DATAINDEX="protocolType",
  RULE_THREAT_TYPE_DATAINDEX="threatType",
  RULE_DATAINDEX="rule",
  RULE_DESCRIPTION="description";

export const RULE_OPERATION_KEY="operation";

export const ruleTextConfig={
  [RULE_THREAT_TYPE_DATAINDEX]:"攻击行为",
  [RULE_DATAINDEX]:"规则",
  [RULE_DESCRIPTION]:"特征描述",
  [RULE_OPERATION_KEY]:"操作",
}

export const ruleDataIndexes=Object.keys(ruleTextConfig)





