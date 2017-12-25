/**
 * Created by jojo on 2017/9/5.
 */

import React from 'react';

export { NAMESPACE as MAIN_NAMESPACE } from '../Main/ConstConfig'
export const NAMESPACE = "threatEventThreatInfo";
/**************************************************
 * table
 **************************************************/
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


export const tableTextConfig = {
  rowTitles: {
    [THREAT_TYPE_DATAINDEX]: "情报类型",
    [FEATURE_DATAINDEX]: "情报特征",
    [THTREAT_NAME_DATAINDEX]: "威胁名称",
    [ACCURACY_DATAINDEX]: "特征准确度"
  },

};


export const formTextConfig = {
  placeholder: PLACEHOLDER
}

