/**
 * Created by jojo on 2017/9/5.
 */

import React from 'react';


export const NAMESPACE="threatEventThreatInfo";
/**************************************************
 * table
 **************************************************/
const THREAT_TYPE_DATAINDEX="threatType",
  FEATURE_DATAINDEX="feature",
  THTREAT_NAME_DATAINDEX="threatName",
  ACCURACY_DATAINDEX="accuracy"




export const rowDataIndexes=[
  THREAT_TYPE_DATAINDEX,
  FEATURE_DATAINDEX,
  THTREAT_NAME_DATAINDEX,
  ACCURACY_DATAINDEX
];


const PLACEHOLDER="特征"


export const tableTextConfig={
  rowTitles:{
    [THREAT_TYPE_DATAINDEX]:"威胁类型",
    [FEATURE_DATAINDEX]:"情报特征",
    [THTREAT_NAME_DATAINDEX]:"威胁名称",
    [ACCURACY_DATAINDEX]:"特征准确度"
  },

};


export const formTextConfig={
  placeholder:PLACEHOLDER
}

