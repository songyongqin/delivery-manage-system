/**
 * Created by jojo on 2017/9/5.
 */
import * as React from 'react'
import * as tools from 'utils'
import { Popconfirm } from 'antd'
import columnsCreator from 'domainUtils/columnsCreator'

import {
  THREAT_NAME_LEVEL_DATAINDEX,
  THREAT_NAME_NAME_DATAINDEX,
  THREAT_NAME_USER_DEFINED_DATAINDEX,
  THREAT_NAME_KEY_DATAINDEX,
  textConfig,
  levelTextConfig,
  dataIndexes,
  levels,
  USER_DEFINED_VALUE,
} from './constants'


import { Button, Switch, Icon, Select, Tooltip } from 'antd'

const getRenderer = ({ handle, con }) => ({

  [THREAT_NAME_LEVEL_DATAINDEX]: (value, records, index) => (
    <Select defaultValue={value}
      onChange={value => handle && handle["put"] && handle["put"]({ ...records, level: value })}
      style={{ width: "100px" }}>
      {levels.map((i, index) => (
        <Select.Option value={i}
          key={`${index}-item`}>
          {tools.getKeyText(i, levelTextConfig)}
        </Select.Option>
      ))}
    </Select>
  ),

  [THREAT_NAME_USER_DEFINED_DATAINDEX]: (value, records, index) =>
    value === USER_DEFINED_VALUE
    &&
    <Popconfirm title="删除该类型，该类型对应的特征也应一并删除，请确认是否删除？"
      placement="topLeft"
      getPopupContainer={_ => {
        return document.body
      }}
      onConfirm={_ => handle && handle["delete"] && handle["delete"](records)}>
      <a style={{ color: "#d73435" }} >
        <Icon type="minus-circle" />
      </a>
    </Popconfirm>

})



export const getColumns = ({ handle }) => columnsCreator({
  dataIndexes,
  titleConfig: textConfig,
  renderer: getRenderer({ handle }),
  extraProps: {
    [THREAT_NAME_LEVEL_DATAINDEX]: {
      width: "45%"
    },
    [THREAT_NAME_NAME_DATAINDEX]: {
      width: "45%"
    },
    [THREAT_NAME_USER_DEFINED_DATAINDEX]: {
      width: "10%",
    }
  }
})
