import * as React from 'react'
import moment from 'moment'
import classnames from 'classnames'
import * as tools from 'utils'

import TimesLabel from 'components/TimeLabel'
import Tag from 'components/Tag'
import { Popover, Icon } from 'antd';
// import { portReg, ipReg } from 'utils'
const OVER_FLOW_LENGTH = 40;
import columnsCreator from 'domainUtils/columnsCreator'


export const TIME_DATA_INDEX = "time",
  THREATJUDGE_DATA_INDEX = "threatJudge",
  SOURCE_IP_DATA_INDEX = "sourceIP",
  SOURCE_PORT_DATA_INDEX = "sourcePort",
  TARGET_IP_DATA_INDEX = "targetIP",
  TARGET_PORT_DATA_INDEX = "targetPort",
  URL_DATA_INDEX = "url",
  HOST_DATA_INDEX = "host",
  METHOD_DATA_INDEX = "method",
  CONTENT_TYPE_DATA_INDEX = "contentType",
  PROTOCOL_TYPE_DATA_INDEX = "protocolType",
  REQUEST_DOMAIN_DATA_INDEX = "requestDomain",
  REQUEST_IP_DATA_INDEX = "requestIP",
  PACKAGE_TYPE_DATA_INDEX = "packageType",
  SENDER_DATA_INDEX = "sender",
  RECEIVE_DATA_INDEX = "receiver",
  PROTOCOL_VERSION_DATA_INDEX = "protocolVersion"



export const HTTP = 'HTTP',
  TCP = "TCP",
  DNS = "DNS",
  FTP = "FTP",
  SMTP = "SMTP",
  SSH = "SSH";

export const protocolTypeList = [HTTP, TCP, DNS, FTP, SMTP, SSH];

export const dataIndexesConfig = {
  [HTTP]: [
    TIME_DATA_INDEX,
    THREATJUDGE_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
    URL_DATA_INDEX,
    HOST_DATA_INDEX,
    METHOD_DATA_INDEX,
    CONTENT_TYPE_DATA_INDEX,
    PROTOCOL_TYPE_DATA_INDEX
  ],
  [TCP]: [
    TIME_DATA_INDEX,
    THREATJUDGE_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
  ],
  [DNS]: [
    TIME_DATA_INDEX,
    THREATJUDGE_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
    REQUEST_DOMAIN_DATA_INDEX,
    REQUEST_IP_DATA_INDEX,
    PACKAGE_TYPE_DATA_INDEX,
    PROTOCOL_TYPE_DATA_INDEX
  ],
  [FTP]: [
    TIME_DATA_INDEX,
    THREATJUDGE_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
  ],
  [SMTP]: [
    TIME_DATA_INDEX,
    THREATJUDGE_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
    SENDER_DATA_INDEX,
    RECEIVE_DATA_INDEX,
  ],
  [SSH]: [
    TIME_DATA_INDEX,
    THREATJUDGE_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
    PROTOCOL_VERSION_DATA_INDEX
  ]
}
export const dataLimitIndexesConfig = {
  [HTTP]: [
    TIME_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
    URL_DATA_INDEX,
    HOST_DATA_INDEX,
    METHOD_DATA_INDEX,
    CONTENT_TYPE_DATA_INDEX,
    PROTOCOL_TYPE_DATA_INDEX
  ],
  [TCP]: [
    TIME_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
  ],
  [DNS]: [
    TIME_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
    REQUEST_DOMAIN_DATA_INDEX,
    REQUEST_IP_DATA_INDEX,
    PACKAGE_TYPE_DATA_INDEX,
    PROTOCOL_TYPE_DATA_INDEX
  ],
  [FTP]: [
    TIME_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
  ],
  [SMTP]: [
    TIME_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
    SENDER_DATA_INDEX,
    RECEIVE_DATA_INDEX,
  ],
  [SSH]: [
    TIME_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
    PROTOCOL_VERSION_DATA_INDEX
  ]
}


export const textConfig = {
  [TIME_DATA_INDEX]: "时间",
  [THREATJUDGE_DATA_INDEX]: "威胁判断",
  [SOURCE_IP_DATA_INDEX]: "源IP",
  [SOURCE_PORT_DATA_INDEX]: "源Port",
  [TARGET_IP_DATA_INDEX]: "目的IP",
  [TARGET_PORT_DATA_INDEX]: "目的Port",
  [URL_DATA_INDEX]: "URL",
  [HOST_DATA_INDEX]: "主机名",
  [METHOD_DATA_INDEX]: "方法名",
  [CONTENT_TYPE_DATA_INDEX]: "内容类型",
  [PROTOCOL_TYPE_DATA_INDEX]: "协议类型",
  [REQUEST_DOMAIN_DATA_INDEX]: "请求域名",
  [REQUEST_IP_DATA_INDEX]: "请求IP",
  [PACKAGE_TYPE_DATA_INDEX]: "包类型",
  [SENDER_DATA_INDEX]: "发件人邮箱",
  [RECEIVE_DATA_INDEX]: "收件人邮箱",
  [PROTOCOL_VERSION_DATA_INDEX]: "协议版本"
}


export const THREATJUDGE_TYPE = "threat_type",
  JUDGE_THREAT = "threat",
  JUDGE_DOUBTFUL = "doubtful",
  JUDGE_ABNORMAL = "abnormal",
  JUDGE_UNKNOWN = "unknown",
  JUDGE_SAFE = "safe"

export const THREAT_TYPE = [
  // JUDGE_THREAT,
  // JUDGE_DOUBTFUL,
  // JUDGE_ABNORMAL,
  JUDGE_UNKNOWN,
  JUDGE_SAFE
]

export const THREAT_TYPE_TEXT = {
  // [JUDGE_THREAT]: "威胁",
  // [JUDGE_DOUBTFUL]: "可疑",
  // [JUDGE_ABNORMAL]: "异常",
  [JUDGE_UNKNOWN]: "未知",
  [JUDGE_SAFE]: "安全"
}

const VALUE_DATA_INDEX = "value";

export const getColumns = ({ filters }) => {

  return columnsCreator({
    dataIndexes: dataIndexesConfig[filters[PROTOCOL_TYPE_DATA_INDEX]],
    titleConfig: textConfig,
    renderer: {
      [TIME_DATA_INDEX]: value => <TimesLabel value={value}></TimesLabel>,
      [URL_DATA_INDEX]: value => value.length > OVER_FLOW_LENGTH
        ?
        <Popover content={<div style={{ maxWidth: "400px", wordBreak: "break-all" }}>
          {value}</div>}>
          <span>
            {value.substr(0, 40) + "..."}
          </span>
        </Popover>
        :
        value
    },

  })
}