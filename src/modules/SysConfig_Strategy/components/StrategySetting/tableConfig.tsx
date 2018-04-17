import * as React from 'react'
import CountUp from 'react-countup';
import Card from 'domainComponents/Card'
// import StrategyRule from 'SysConfig_Strategy_Rule/Page'
import columnsCreator from 'domainUtils/columnsCreator'
import { Button, Switch, Icon } from 'antd'
import Rule from './Rule'

import {
  dataIndexes,
  textConfig,
  TOTAL_DATAINDEX,
  STRATEGY_OPERATION_KEY,
  USEFUL_DATAINDEX,
  USERFUL_VALUE,
  PROTOCOLTYPE_DATAINDEX
} from '../../constants'



function getRenderer({ handle, expandedRowKeys }) {
  return {
    [TOTAL_DATAINDEX]: value => <CountUp start={value}
      end={value}
      separator={","}
      useGrouping={true}
      duration={1}
      delay={0} />,

    [USEFUL_DATAINDEX]: (value, records) => (
      <Switch checkedChildren={<Icon type="check" />}
        onChange={value => handle && handle["switch"] && handle["switch"]({ [records["protocolType"]]: value ? 1 : 0 })}
        unCheckedChildren={<Icon type="cross" />}
        defaultChecked={value === USERFUL_VALUE} />
    ),

    [STRATEGY_OPERATION_KEY]: (value, records, index) => (
      <Button
        type="primary"
        onClick={_ => handle && handle["show"] && handle["show"](records)}
      >
        {expandedRowKeys.includes(records["key"]) ? <Icon type="minus" /> : <Icon type="plus" />}
        配置
      </Button>
    )
  }
}

export const getColumns = ({ handle, expandedRowKeys }) =>
  columnsCreator({
    dataIndexes,
    titleConfig: textConfig,
    renderer: getRenderer({ handle, expandedRowKeys }),
  })


export const getExpandedRowRenderer = ({ expandedRowKeys, onChange }) => (records, index) => {

  return (
    expandedRowKeys.includes(records["key"])
      ?
      <Rule
        onChange={onChange}
        key={`${expandedRowKeys.includes(records["key"])}-rule-item`}
        records={records} />
      :
      <div>
      </div>
  )
}