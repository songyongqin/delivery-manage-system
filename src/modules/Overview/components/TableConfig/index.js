/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import tableColumnsGenerator from '../../../../utils/tableColumnsGenerator';
import JoTag from '../../../../components/JoTag';
import { Icon, Switch, Card, Timeline, InputNumber, Button, Badge } from 'antd';
import classnames from 'classnames';
import * as tools from '../../../../utils/tools';
import commonConstConfig from '../../../../configs/ConstConfig';
import {
  filterRowDataIndexes,
  rowDataIndexes,
  tableTextConfig,
  COUNTS_DATAINDEX,
  ACTIONSTATUS_DATAINDEX,
  SOURCE_DATAINDEX,
  PERCEPTION_DATAINDEX,
  ACTION_DATAINDEX,
  HONEYPOT_NAME_DATAINDEX,
  MAC_DATAINDEX,
  DETAILS_DATAINDEX,
  ADVICE_DATAINDEX,
  HONEYPOT_SOURCE,
  IDS_SOURCE,
  sourceTextConfig
} from '../../ConstConfig';
import FilterInputNumber from '../../../../components/FilterInputNumber/index';
import TimeLabel from '../../../../components/TimesLabel';
import CountUp from 'react-countup';

import {
  ACTIONSTATUS_SUCCESS,
  ACTIONSTATUS_FAIL,
  ACTIONSTATUS_UNKNOW,
} from '../../../../configs/ConstConfig';

const rowsRenderer = {
  description: value => {

    const color = "#108ee9";

    try {
      return <div>
        {
          value.map((i, index) => {
            return <div key={`${index}-des`}
              style={{ marginBottom: "8px" }}>
              <JoTag color={color}
              // color={index%2===0?"#87d068":"#f50"}
              >
                {i}
              </JoTag>
            </div>
          })
        }
      </div>
    } catch (e) {
      console.info(e);
    }
  },
  attackTimes: value => {
    return <TimeLabel times={value} />
  },
  counts: value => {
    return <CountUp start={0}
      end={value}
      separator={","}
      useGrouping={true}
      duration={1}
      delay={0} />
  }
};


const renderer = { ...rowsRenderer },
  filterOptions = {};

filterRowDataIndexes.forEach(k => {
  /*添加所有选项*/
  filterOptions[k] = commonConstConfig.enums[k];
  /*单元格内内容文本转化*/
  let targetFilter = commonConstConfig.textConfig[k] || {};
  renderer[k] = value => {
    return value in targetFilter ? targetFilter[value] : value;
  }
});
let actionRenderer = renderer[ACTIONSTATUS_DATAINDEX];

renderer[ACTIONSTATUS_DATAINDEX] = value => {
  if (value === ACTIONSTATUS_SUCCESS) {
    return <span><Badge status="success" />{actionRenderer(value)}</span>
  }
  if (value === ACTIONSTATUS_FAIL) {
    return <span><Badge status="error" />{actionRenderer(value)}</span>
  }
  return <span><Badge status="warning" />{actionRenderer(value)}</span>

}

const FILTER_INPUT_LABEL = "归并次数阈值设置"

export const getColumns = ({ queryFilters, onSubmit, filters, filterTextConfig = {} }) => tableColumnsGenerator({
  keys: rowDataIndexes,
  titleTextConfig: tableTextConfig.colTitles,
  filterTextConfig: { ...commonConstConfig.textConfig, ...filterTextConfig },
  // filterOptions: { ...filterOptions, ...filters },
  // filteredValue: queryFilters,
  renderer,
  extraProps: {
    [COUNTS_DATAINDEX]: {
      filterIcon: <Icon type="filter" style={{ color: "#108ee9" }} />,
      filterDropdown: <FilterInputNumber textConfig={{ label: FILTER_INPUT_LABEL }}
        defaultValue={queryFilters.mergeCounts}
        onSubmit={onSubmit} />

    }
  }
});
