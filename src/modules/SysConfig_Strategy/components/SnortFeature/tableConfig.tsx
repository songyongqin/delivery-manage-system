import * as React from 'react'
import columnsCreator from 'domainUtils/columnsCreator'

import { Popconfirm } from 'antd'
import TimeLabel from "domainComponents/TimeLabel"
export const TIME_DATAINDEX = "updateTime",
  RULE_DATAINDEX = "snortrule",
  STATUS_DATAINDEX = "status",
  ID_DATAINDEX = "id";

export const STRATEGY_OPERATION_KEY = "operation";

export const textConfig = {
  [ID_DATAINDEX]: "特征ID",
  [TIME_DATAINDEX]: "最后更新时间",
  [RULE_DATAINDEX]: "自定义snort规则",
  [STATUS_DATAINDEX]: "状态",
  [STRATEGY_OPERATION_KEY]: "操作"
}

export const dataIndexes = Object.keys(textConfig);

export const DOMAIN_TYPE = "domain",
  IP_TYPE = "ip"

export const typeTextConfig = {
  [DOMAIN_TYPE]: "域名",
  [IP_TYPE]: "IP"
}

export const types = Object.keys(typeTextConfig)

export const OPEN_VALUE = 1,
  UN_OPEN_VALUE = 0;

import { Button, Switch, Icon } from 'antd'

function getRenderer({ handle }) {
  return {
    [TIME_DATAINDEX]: value => <TimeLabel value={value}></TimeLabel>,
    [STATUS_DATAINDEX]: (value, records) => (
      <Switch checkedChildren={<Icon type="check" />}
        onChange={value => handle && handle["put"] && handle["put"]({ idList: [records[ID_DATAINDEX]], status: value ? 1 : 0 })}
        unCheckedChildren={<Icon type="cross" />}
        defaultChecked={value === OPEN_VALUE} />
    ),
    [STRATEGY_OPERATION_KEY]: (value, records, index) => (
      <span><a onClick={() => handle.edit(records)}><Icon type="edit" style={{ fontSize: 20, color: '#08c' }} /></a>&nbsp;&nbsp;<a onClick={() => handle.delete(records.id)}><Icon type="delete" style={{ fontSize: 16, color: 'red' }} /></a></span>
    )
  }

}

export const getColumns = ({ handle }) =>
  columnsCreator({
    dataIndexes: dataIndexes,
    titleConfig: textConfig,
    renderer: getRenderer({ handle }),
  })