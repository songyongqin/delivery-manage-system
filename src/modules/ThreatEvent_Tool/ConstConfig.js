/**
 * Created by jojo on 2017/9/5.
 */

import React from 'react';


export const NAMESPACE = "threatEventTool";
/**************************************************
 * table
 **************************************************/
export const TOOL_NAME_DATAINDEX = "toolName",
  MD5_DATAINDEX = "md5",
  DESCRIPTION_DATAINDEX = "description";




export const rowDataIndexes = [
  TOOL_NAME_DATAINDEX,
  MD5_DATAINDEX,
  DESCRIPTION_DATAINDEX,
];


const PLACEHOLDER = "家族或MD5"


export const tableTextConfig = {
  rowTitles: {
    [TOOL_NAME_DATAINDEX]: "攻击武器",
    [MD5_DATAINDEX]: "MD5",
    [DESCRIPTION_DATAINDEX]: "攻击武器介绍",
  },

};


export const formTextConfig = {
  placeholder: PLACEHOLDER
}
