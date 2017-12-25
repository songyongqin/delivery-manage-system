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
  FEATURE_DATAINDEX,
  filterOptions as staticFilterOptions,
  filterTextConfig as statistFilterTextConfig,
  THTREAT_NAME_DATAINDEX
} from '../ConstConfig'
import { statisticsTextConfig } from 'modules/Analyse_Event/ConstConfig';

const filterDataIndexes = [
  FEATURE_DATAINDEX,
  THTREAT_NAME_DATAINDEX
]

const filterFormTextConfig = {
  [FEATURE_DATAINDEX]: {
    label: "特征",
    placeholder: ""
  },
  [THTREAT_NAME_DATAINDEX]: {
    label: "威胁名称",
    placeholder: ""
  }
}

export const getColumns = ({ queryFilters, onQuery, filtersOption, filterTextConfig }) => {
  return tableColumnsGenerator({
    keys: rowDataIndexes,
    titleTextConfig: tableTextConfig.rowTitles,
    filterTextConfig: { ...commonConstConfig.textConfig, ...statistFilterTextConfig, ...filterTextConfig },
    filterOptions: { ...staticFilterOptions, ...filtersOption },
    filteredValue: queryFilters,
    extraProps: {
      ...getFilterForm({
        dataIndexes: filterDataIndexes,
        textConfig: filterFormTextConfig,
        onQuery,
        queryFilters,
      })
    }
  });

};



