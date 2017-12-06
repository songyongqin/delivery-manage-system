/**
 * Created by jojo on 2017/9/5.
 */

import React from 'react';
import JoIcon from '../../components/JoIcon';


export const NAMESPACE = "overview";
export const STATISTICS_NAMESPACE = "overviewStatistics"
export const EVENT_NAMESPACE = "overviewEvent"
/**************************************************
 * table
 **************************************************/
export const ATTACKSTAGE_DATAINDEX = "attackStage",
  ACTION_DATAINDEX = "action",
  LEVEL_DATAINDEX = "level",
  ACTIONSTATUS_DATAINDEX = "actionStatus",
  COUNTS_DATAINDEX = "counts",
  DESCRIPTION_DATAINDEX = "description",
  ATTACKTIMES_DATAINDEX = "attackTimes",

  DETAILS_DATAINDEX = "details",
  ADVICE_DATAINDEX = "advice";


export const EVENT_TYPE = "eventType"

export const PERCEPTION_DATAINDEX = "perception",
  SOURCE_DATAINDEX = "source",
  HONEYPOT_NAME_DATAINDEX = "honeypotName",
  MAC_DATAINDEX = "mac"

export const HONEYPOT_SOURCE = "honeypot",
  IDS_SOURCE = "ids"

export const sourceTextConfig = {
  [HONEYPOT_SOURCE]: "蜜罐",
  [IDS_SOURCE]: "入侵检测模块"
}

export const filterRowDataIndexes = [
  ATTACKSTAGE_DATAINDEX,
  ACTION_DATAINDEX,
  LEVEL_DATAINDEX,
  ACTIONSTATUS_DATAINDEX
];

export const rowDataIndexes = [
  ATTACKTIMES_DATAINDEX,
  ATTACKSTAGE_DATAINDEX,
  ACTION_DATAINDEX,
  LEVEL_DATAINDEX,
  EVENT_TYPE,
  ACTIONSTATUS_DATAINDEX,
  DESCRIPTION_DATAINDEX
];

const TABLE_TITLE = "威胁事件分析",
  EXPANDED_ROW_TITLE = "详细信息";

export const tableTextConfig = {
  title: TABLE_TITLE,
  colTitles: {
    [ATTACKSTAGE_DATAINDEX]: "攻击阶段",
    [ACTION_DATAINDEX]: "行为",
    [LEVEL_DATAINDEX]: "威胁等级",
    [ACTIONSTATUS_DATAINDEX]: "操作状态",
    [DESCRIPTION_DATAINDEX]: "威胁描述",
    [COUNTS_DATAINDEX]: "次数",
    [ATTACKTIMES_DATAINDEX]: "攻击时间",
    [EVENT_TYPE]: "事件类型"
  },
  expandedRow: {
    title: EXPANDED_ROW_TITLE,
    rows: {
      [DETAILS_DATAINDEX]: "详情",
      [ADVICE_DATAINDEX]: "修补建议",
      [SOURCE_DATAINDEX]: "感知来源",
      [MAC_DATAINDEX]: "感知威胁设备MAC地址",
      [HONEYPOT_NAME_DATAINDEX]: "感知威胁蜜罐名称"
    }
  },
};
/**************************************************
 * statistic
 **************************************************/
const STATISTICS_TITLE = "威胁事件分类";

const _COUNTS_DATAINDEX = "counts",
  HIGHEVENTS_DATAINDEX = 'highEvents',
  EXPLOITS_DATAINDEX = "exploits",
  TOOLS_DATAINDEX = "tools",
  THREATINFOS_DATAINDEX = "threatInfos";

export const FALLHOST_DATAINDEX = "fallHosts";





export const statisticDataIndexes = [
  _COUNTS_DATAINDEX,
  HIGHEVENTS_DATAINDEX,
  EXPLOITS_DATAINDEX,
  TOOLS_DATAINDEX,
  THREATINFOS_DATAINDEX,
  FALLHOST_DATAINDEX
];

export const haveDetailsDataIndexes = [
  EXPLOITS_DATAINDEX,
  TOOLS_DATAINDEX,
  THREATINFOS_DATAINDEX,
]

export const statisticsTextConfig = {
  title: STATISTICS_TITLE,
  items: {
    [_COUNTS_DATAINDEX]: "攻击次数",
    [HIGHEVENTS_DATAINDEX]: "攻击高危次数",
    [EXPLOITS_DATAINDEX]: "攻击利用漏洞",
    [TOOLS_DATAINDEX]: "攻击武器",
    [THREATINFOS_DATAINDEX]: "威胁情报",
    [FALLHOST_DATAINDEX]: "失陷主机"
  },
  units: {
    [_COUNTS_DATAINDEX]: "次",
    [HIGHEVENTS_DATAINDEX]: "起",
    [EXPLOITS_DATAINDEX]: "个",
    [TOOLS_DATAINDEX]: "个",
    [THREATINFOS_DATAINDEX]: "条",
    [FALLHOST_DATAINDEX]: "台"
  },
  icons: {
    [_COUNTS_DATAINDEX]: <JoIcon type="hacker" />,
    [HIGHEVENTS_DATAINDEX]: <JoIcon type="exclamationcircleo" />,
    [EXPLOITS_DATAINDEX]: <JoIcon type="bug" />,
    [TOOLS_DATAINDEX]: <JoIcon type="eyedropper" />,
    [THREATINFOS_DATAINDEX]: <JoIcon type="filetext1" />,
    [FALLHOST_DATAINDEX]: <JoIcon type="iconfontdesktop" />
  }
};


export { EVENT_ACTION_DATA_INDEX, EVENT_TYPE_DATA_INDEX } from '../../configs/ConstConfig';
export { NAMESPACE as MAIN_NAMESPACE } from '../Main/ConstConfig';

export { NAMESPACE as RANKING_NAMESPACE } from '../Overview_Ranking/ConstConfig'
export { NAMESPACE as FLOW_NAMESPACE } from '../Overview_Flow/ConstConfig'