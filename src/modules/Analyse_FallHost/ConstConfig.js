/**
 * Created by jojo on 2017/9/5.
 */

import React from 'react';
import JoIcon from '../../components/JoIcon';


export const NAMESPACE="analyseFallHost";
/**************************************************
 * table
 **************************************************/
const IP_DATAINDEX="ip",
      ATTACK_COUNTS_DATAINDEX="attackCounts",
      ATTACK_EVENT_TYPE_DATAINDEX="attackEventType",
      ATTACKTIMES_DATAINDEX="attackTimes",


      DESCRIPTION_DATAINDEX="description",
      DETAILS_DATAINDEX="details",
      TITLE_DATAINDEX="title";


export const rowDataIndexes=[
  IP_DATAINDEX,
  ATTACK_COUNTS_DATAINDEX,
  ATTACK_EVENT_TYPE_DATAINDEX,
  ATTACKTIMES_DATAINDEX,
];

const EXPANDED_ROW_TITLE="事件行为描述",
      DESCRIPTION_TEXT="行为详细信息";

export const tableTextConfig={
  rowTitles:{
    [IP_DATAINDEX]:"失陷主机IP",
    [ATTACK_COUNTS_DATAINDEX]:"攻击次数",
    [ATTACK_EVENT_TYPE_DATAINDEX]:"攻击事件类型",
    [ATTACKTIMES_DATAINDEX]:"攻击事件范围"
  },
  expandedRow:{
    title:EXPANDED_ROW_TITLE,
    description:DESCRIPTION_TEXT
  },
};




