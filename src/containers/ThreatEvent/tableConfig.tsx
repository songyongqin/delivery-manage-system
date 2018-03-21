import * as React from 'react'
import columnsCreator from 'domainUtils/columnsCreator'
import Tag from 'components/Tag'
import { Icon, Switch, Card, Timeline, InputNumber, Button } from 'antd'
// import {
//   rowDataIndexes,
//   tableTextConfig,
//   NUMBER_DATAINDEX,
//   SERVICE_DATAINDEX,
//   ADVICE_DATAINDEX,
//   PLACEHOLDER
// } from '../ConstConfig';
// import getFilterForm from 'utils/getFilterForm'

export const INVADE_DATAINDEX = "intrusion",
  INSTALL_DATAINDEX = "install",
  CONTROL_DATAINDEX = "control",
  INTENTION_DATAINDEX = "intention"

export const attackStage = [
  INVADE_DATAINDEX,
  INSTALL_DATAINDEX,
  CONTROL_DATAINDEX,
  INTENTION_DATAINDEX
];

export const attackStageTextConfig = {
  [INVADE_DATAINDEX]: "入侵",
  [INSTALL_DATAINDEX]: "安装",
  [CONTROL_DATAINDEX]: "控制",
  [INTENTION_DATAINDEX]: "意图",
};

/***********************************************************************************************************/
/*
*  威胁等级枚举值
* */
export const HIGH = "high",
  MIDDLE = "middle",
  LOW = "low",
  UN_KNOW = "unknow";


export const levelTextConfig = {
  [HIGH]: "高危",
  [MIDDLE]: "中危",
  [LOW]: "低危",
  // [UN_KNOW]: "未知"
};

export const level = Object.keys(levelTextConfig)
/***********************************************************************************************************/
/*
*  操作状态枚举值
* */
export const ACTIONSTATUS_SUCCESS = 1,
  ACTIONSTATUS_FAIL = 0,
  ACTIONSTATUS_UNKNOW = -1;



export const actionStatusTextConfig = {
  [ACTIONSTATUS_SUCCESS]: "成功",
  [ACTIONSTATUS_FAIL]: "失败",
  [ACTIONSTATUS_UNKNOW]: "未知"
};

export const actionStatus = Object.keys(actionStatusTextConfig)

const action = Object.keys({})

const commonConstConfig = {
  enums: {
    attackStage,
    level,
    actionStatus,
    action,
  },
  textConfig: {
    attackStage: attackStageTextConfig,
    level: levelTextConfig,
    actionStatus: actionStatusTextConfig,
    action: {},
  }
}

export const NUMBER_DATAINDEX = "number",
  SERVICE_DATAINDEX = "service",
  ADVICE_DATAINDEX = "advice";

const filterDataIndexes = [
  NUMBER_DATAINDEX,
  SERVICE_DATAINDEX,
]

const filterFormTextConfig = {
  [NUMBER_DATAINDEX]: {
    label: "漏洞编号",
    placeholder: ""
  },
  [SERVICE_DATAINDEX]: {
    label: "被利用的漏洞服务",
    placeholder: ""
  },


}

export const tableTextConfig = {
  rowTitles: {
    [NUMBER_DATAINDEX]: "漏洞编号",
    [SERVICE_DATAINDEX]: "存在漏洞的应用类型",
    [ADVICE_DATAINDEX]: "修补策略",
  },

};


export const exploitRowDataIndexes = [
  NUMBER_DATAINDEX,
  SERVICE_DATAINDEX,
  ADVICE_DATAINDEX
];



export const getExploitColumns = ({ queryFilters, onQuery }) => {

  const filterOptions = {};

  return columnsCreator({
    dataIndexes: exploitRowDataIndexes,
    titleConfig: tableTextConfig.rowTitles,
    filtersTextConfig: commonConstConfig.textConfig,

    filtersConfig: filterOptions,
    filteredValue: queryFilters,
    // extraProps: {
    //   ...getFilterForm({
    //     dataIndexes: filterDataIndexes,
    //     textConfig: filterFormTextConfig,
    //     onQuery,
    //     queryFilters,
    //   })
    // }
  });

};


export const THREAT_TYPE_DATAINDEX = "threatType",
  FEATURE_DATAINDEX = "feature",
  THTREAT_NAME_DATAINDEX = "threatName",
  ACCURACY_DATAINDEX = "accuracy"


export const EXACT_VALUE = "exact",
  SUSPECTED_VALUE = "suspected",
  UN_KNOW_VALUE = "unknow"

export const filterTextConfig = {
  [ACCURACY_DATAINDEX]: {
    [EXACT_VALUE]: "精确",
    [SUSPECTED_VALUE]: "疑似",
    [UN_KNOW_VALUE]: "未知"
  }
}

export const filterOptions = {
  [ACCURACY_DATAINDEX]: [EXACT_VALUE, SUSPECTED_VALUE, UN_KNOW_VALUE]
}

export const rowDataIndexes = [
  THREAT_TYPE_DATAINDEX,
  FEATURE_DATAINDEX,
  THTREAT_NAME_DATAINDEX,
  ACCURACY_DATAINDEX
];


export const PLACEHOLDER = "特征"



export const formTextConfig = {
  placeholder: PLACEHOLDER
}

export const threatInfoRowDataIndexes = [
  THREAT_TYPE_DATAINDEX,
  FEATURE_DATAINDEX,
  THTREAT_NAME_DATAINDEX,
  ACCURACY_DATAINDEX
];


export const getThreatInfoColumns = ({ queryFilters, onQuery, filtersOption, filterTextConfig }) => {
  return columnsCreator({
    dataIndexes: threatInfoRowDataIndexes,
    titleConfig: {
      [THREAT_TYPE_DATAINDEX]: "情报类型",
      [FEATURE_DATAINDEX]: "情报特征",
      [THTREAT_NAME_DATAINDEX]: "威胁名称",
      [ACCURACY_DATAINDEX]: "特征准确度"
    },
    filtersTextConfig: {},
    filtersConfig: { ...filtersOption },
    filteredValue: queryFilters,
    // extraProps: {
    //   ...getFilterForm({
    //     dataIndexes: filterDataIndexes,
    //     textConfig: filterFormTextConfig,
    //     onQuery,
    //     queryFilters,
    //   })
    // }
  });

};