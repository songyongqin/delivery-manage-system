/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import tableColumnsGenerator from '../../../utils/tableColumnsGenerator';
import JoTag from '../../../components/JoTag';
import { Icon, Switch, Card, Timeline, InputNumber, Button } from 'antd';
import commonConstConfig from '../../../configs/ConstConfig';
import { rowDataIndexes, tableTextConfig } from '../ConstConfig';
import getFilterForm from 'utils/getFilterForm'
import {
  TOOL_NAME_DATAINDEX,
  MD5_DATAINDEX
} from '../ConstConfig'

const filterDataIndexes = [
  TOOL_NAME_DATAINDEX,
  MD5_DATAINDEX
]

const filterFormTextConfig = {
  [TOOL_NAME_DATAINDEX]: {
    label: "攻击武器",
    placeholder: ""
  },
  [MD5_DATAINDEX]: {
    label: "MD5",
    placeholder: ""
  }
}


export const getColumns = ({ queryFilters, onQuery }) => {

  const filterOptions = {};

  return tableColumnsGenerator({
    keys: rowDataIndexes,
    titleTextConfig: tableTextConfig.rowTitles,
    filterTextConfig: commonConstConfig.textConfig,
    filterOptions: filterOptions,
    filteredValue: queryFilters,
    extraProps: {
      ...getFilterForm({
        dataIndexes: filterDataIndexes,
        textConfig: filterFormTextConfig,
        onQuery,
        queryFilters
      })
    }
  });

};



