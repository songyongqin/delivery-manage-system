/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import tableColumnsGenerator from '../../../utils/tableColumnsGenerator';
import JoTag from '../../../components/JoTag';
import {Icon,Switch,Card,Timeline,InputNumber,Button} from 'antd';
import commonConstConfig from '../../../configs/ConstConfig';
import {rowDataIndexes,tableTextConfig} from '../ConstConfig';

export const getColumns=({queryFilters})=>{

  const filterOptions={};

  return tableColumnsGenerator({
    keys:rowDataIndexes,
    titleTextConfig:tableTextConfig.rowTitles,
    filterTextConfig:commonConstConfig.textConfig,
    filterOptions:filterOptions,
    filteredValue:queryFilters,
  });

};



