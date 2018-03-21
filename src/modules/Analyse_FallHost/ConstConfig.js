/**
 * Created by jojo on 2017/9/5.
 */

import React from 'react';
import JoIcon from '../../components/JoIcon';


export const NAMESPACE = "analyseFallHost";
/**************************************************
 * table
 **************************************************/
export const IP_DATAINDEX = "ip",
  ATTACK_COUNTS_DATAINDEX = "attackCounts",
  ATTACK_EVENT_TYPE_DATAINDEX = "attackEventType",
  ATTACK_EVENT_TYPE_LIST_DATAINDEX = "attackEventTypeList",
  ATTACKTIMES_DATAINDEX = "attackTimes",
  MAC_DATAINDEX = "mac",

  DESCRIPTION_DATAINDEX = "description",
  DETAILS_DATAINDEX = "details",
  TITLE_DATAINDEX = "title",

  SOURCE_DATAINDEX = "source",

  ITEMS_DATAINDEX = "items";

export const rowDataIndexes = [
  IP_DATAINDEX,
  // ATTACK_COUNTS_DATAINDEX,
  // ATTACK_EVENT_TYPE_DATAINDEX,
  ATTACK_EVENT_TYPE_LIST_DATAINDEX,
  MAC_DATAINDEX,
  // ATTACKTIMES_DATAINDEX,
];

const EXPANDED_ROW_TITLE = "详细信息"

export const tableTextConfig = {
  rowTitles: {
    [IP_DATAINDEX]: "失陷主机IP",
    [ATTACK_COUNTS_DATAINDEX]: "攻击次数",
    [ATTACK_EVENT_TYPE_DATAINDEX]: "事件类型",
    [ATTACKTIMES_DATAINDEX]: "攻击事件范围",
    [ATTACK_EVENT_TYPE_LIST_DATAINDEX]: "事件类型",
    [MAC_DATAINDEX]: "MAC地址"
  },
  expandedRow: {
    title: EXPANDED_ROW_TITLE,
    description: "行为详细信息"
  },
};

export const expandTextConfig = {
  [DESCRIPTION_DATAINDEX]: "事件详情描述:",
  [ATTACK_COUNTS_DATAINDEX]: "事件归并次数:",
  [ATTACK_EVENT_TYPE_DATAINDEX]: "事件类型:",
  [ATTACKTIMES_DATAINDEX]: "事件时间范围:",
  [SOURCE_DATAINDEX]: "感知来源:"
}


export const HONEYPOT_SOURCE = "honeypot",
  IDS_SOURCE = "ids"

export const sourceTextConfig = {
  [HONEYPOT_SOURCE]: "蜜罐",
  [IDS_SOURCE]: "入侵检测模块"
}

export const IDS_SOURCE_DES_SOURCE_IP_DATAINDEX = "sourceIp",
  IDS_SOURCE_DES_SOURCE_PORT_DATAINDEX = "sourcePort",
  IDS_SOURCE_DES_TARGET_IP_DATAINDEX = "targetIp",
  IDS_SOURCE_DES_TARGET_PORT_DATAINDEX = "targetPort",
  IDS_SOURCE_DES_DOMAIN_DATAINDEX = "domain",
  IDS_SOURCE_DES_PROTOCOL_DATAINDEX = "protocol",
  IDS_SOURCE_DES_OTHER_DATAINDEX = "other"


export { EVENT_TYPE_DATA_INDEX } from '../../configs/ConstConfig'

export { NAMESPACE as MAIN_NAMESPACE } from '../Main/ConstConfig'