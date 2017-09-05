/**
 * Created by jojo on 2017/9/5.
 */

export const NAMESPACE="analyseAttackChain";

const INVADE_DATAINDEX="invade",
      INSTALL_DATAINDEX="install",
      CONTROL_DATAINDEX="control",
      INTENTION_DATAINDEX="intention",
      ATTACKTIMES_DATAINDEX="attackTimes"

export const stageRowDataIndexes=[
  INVADE_DATAINDEX,
  INSTALL_DATAINDEX,
  CONTROL_DATAINDEX,
  INTENTION_DATAINDEX
];

export const rowDataIndexes=[ATTACKTIMES_DATAINDEX,...stageRowDataIndexes];


const EXPANDED_ROW_DESCRIPTION="事件详情"

const tableTextConfig={
  rowTitles:{
    [ATTACKTIMES_DATAINDEX]:"攻击链时间范围",
    [INVADE_DATAINDEX]:"入侵",
    [INSTALL_DATAINDEX]:"安装",
    [CONTROL_DATAINDEX]:"控制",
    [INTENTION_DATAINDEX]:"意图",
  },
  expandedRow:{
    description:EXPANDED_ROW_DESCRIPTION
  }
}



export default {
  tableTextConfig,
}
