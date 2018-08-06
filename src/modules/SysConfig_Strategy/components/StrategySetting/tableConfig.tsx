import * as React from 'react'
import CountUp from 'react-countup';
import Card from 'domainComponents/Card'
// import StrategyRule from 'SysConfig_Strategy_Rule/Page'
import columnsCreator from 'domainUtils/columnsCreator'
import { Button, Switch, Icon } from 'antd'
import Rule from './Rule'
import { pick } from 'utils'
import { ruleItemsConfig } from '../../constants'
import Tag from 'components/Tag'
import TimeLabel from 'domainComponents/TimeLabel'
import {
  dataIndexes,
  textConfig,
  RULE,
  STRATEGY_OPERATION_KEY,
  USERFUL_VALUE,
  STATUS,
  UPDATETIME

} from '../../constants'



function getRenderer({ handle, expandedRowKeys }) {
  return {
    [UPDATETIME]: value => <TimeLabel value={value}></TimeLabel>,
    [STATUS]: (value, records) => (
      <Switch checkedChildren={<Icon type="check" />}
        onChange={value => handle && handle["switch"] && handle["switch"]({ idList: [records["id"]], status: value ? 1 : 0 })}
        unCheckedChildren={<Icon type="cross" />}
        defaultChecked={value === USERFUL_VALUE} />
    ),
    [RULE]: (value, records) => {
      const ruleKeys = ruleItemsConfig[records.protocolType] || []
      return Object.values(pick(ruleKeys, value)).map(i => (
        [
          <Tag color="#108ee9" key={`${i}-tag`}>{i}</Tag>,
          <br key={`${i}-br`} />
        ]
      ))

    },
    [STRATEGY_OPERATION_KEY]: (value, records, index) => (
      <span><a onClick={() => handle.edit(records)}><Icon type="edit" style={{ fontSize: 20, color: '#08c' }} /></a>&nbsp;&nbsp;<a onClick={() => handle.delete(records.id)}><Icon type="delete" style={{ fontSize: 16, color: 'red' }} /></a></span>
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
