/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import tableColumnsGenerator from '../../../../utils/tableColumnsGenerator';
import CountUp from 'react-countup';
import Card from '../../../../domainComponents/Card';
import StrategyRule from '../../../SysConfig_Strategy_Rule/Page';

import {
  dataIndexes,
  textConfig,
  TOTAL_DATAINDEX,
  STRATEGY_OPERATION_KEY,
  USEFUL_DATAINDEX,
  USERFUL_VALUE,
  PROTOCOLTYPE_DATAINDEX
} from '../../ConstConfig';


import { Button, Switch, Icon } from 'antd'

function getRenderer({ getUsefulOnChangeHandle, getExpandRowOnChange, expandedRowIndexes }) {
  return {
    [TOTAL_DATAINDEX]: value => <CountUp start={value}
      end={value}
      separator={","}
      useGrouping={true}
      duration={1}
      delay={0} />,

    [USEFUL_DATAINDEX]: (value, records) => (
      <Switch checkedChildren={<Icon type="check" />}
        onChange={getUsefulOnChangeHandle(records[PROTOCOLTYPE_DATAINDEX])}
        unCheckedChildren={<Icon type="cross" />}
        defaultChecked={value === USERFUL_VALUE} />
    ),

    [STRATEGY_OPERATION_KEY]: (value, records, index) => (
      <Button type="primary"
        onClick={getExpandRowOnChange(index)}>
        配置
      {expandedRowIndexes.includes(index) ? <Icon type="arrow-up" /> : <Icon type="arrow-down" />}
      </Button>
    )
  }

}

export const getColumns = ({ getUsefulOnChangeHandle, getExpandRowOnChange, expandedRowIndexes } = {}) =>
  tableColumnsGenerator({
    keys: dataIndexes,
    titleTextConfig: textConfig,
    renderer: getRenderer({ getUsefulOnChangeHandle, getExpandRowOnChange, expandedRowIndexes }),
  })


export const getExpandedRowRenderer = ({ expandedRowIndexes }) => (records, index) => (
  <div style={{ marginLeft: "40px" }}>
    <StrategyRule key={`${expandedRowIndexes.includes(index)}-rule-item`}
      {...{
        [PROTOCOLTYPE_DATAINDEX]: records[PROTOCOLTYPE_DATAINDEX]
      }
      } />
  </div>
)
