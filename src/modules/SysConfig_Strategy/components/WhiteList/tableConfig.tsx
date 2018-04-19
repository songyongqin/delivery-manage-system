import * as React from 'react'
import columnsCreator from 'domainUtils/columnsCreator'

import { Popconfirm } from 'antd'

export const TYPE_DATAINDEX = "type",
  FEATURE_DATAINDEX = "feature",
  OPEN_DATAINDEX = "open",
  ID_DATAINDEX = "id";

export const STRATEGY_OPERATION_KEY = "operation";

export const textConfig = {
  [TYPE_DATAINDEX]: "白名单类型",
  [FEATURE_DATAINDEX]: "白名单特征",
  [OPEN_DATAINDEX]: "是否可用",
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
    [OPEN_DATAINDEX]: (value, records) => (
      <Switch checkedChildren={<Icon type="check" />}
        onChange={value => handle && handle["put"] && handle["put"]({ [records[ID_DATAINDEX]]: value ? 1 : 0 })}
        unCheckedChildren={<Icon type="cross" />}
        defaultChecked={value === OPEN_VALUE} />
    ),
    [STRATEGY_OPERATION_KEY]: (value, records, index) => (
      <Popconfirm title="是否删除该白名单特征？"
        onConfirm={_ => handle && handle["delete"] && handle["delete"](records)}>
        <Button type="danger"
          style={{
            color: "white",
            background: "#f04134",
            borderColor: "#f04134"
          }}>
          删除
        </Button>
      </Popconfirm>
    )
  }

}

export const getColumns = ({ handle }) =>
  columnsCreator({
    dataIndexes: dataIndexes,
    titleConfig: textConfig,
    renderer: getRenderer({ handle }),
  })