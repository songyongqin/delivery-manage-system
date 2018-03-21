import * as React from 'react'
import columnsCreator from 'domainUtils/columnsCreator'
import TimeLabel from 'domainComponents/TimeLabel'
import Tag from 'components/Tag'
import { primaryColor } from 'themes/vars'
import { Badge } from 'antd'
import { Choose, When, Otherwise } from 'components/ControlStatements'

const ATTACK_TIMES_DATA_INDEX = "attackTimes",
  ATTACK_STAGE_DATA_INDEX = "attackStage",
  ACTION_DATA_INDEX = "action",
  LEVEL_DATA_INDEX = "level",
  EVENT_TYPE_DATA_INDEX = "eventType",
  ACTION_STATUS_DATA_INDEX = "actionStatus",
  DES_DATA_INDEX = "description"

const dataIndexes = [
  ATTACK_TIMES_DATA_INDEX,
  ATTACK_STAGE_DATA_INDEX,
  ACTION_DATA_INDEX,
  LEVEL_DATA_INDEX,
  EVENT_TYPE_DATA_INDEX,
  ACTION_STATUS_DATA_INDEX,
  DES_DATA_INDEX
]

const locale = {
  [ATTACK_TIMES_DATA_INDEX]: "攻击时间",
  [ATTACK_STAGE_DATA_INDEX]: "攻击阶段",
  [ACTION_DATA_INDEX]: "行为",
  [LEVEL_DATA_INDEX]: "威胁等级",
  [EVENT_TYPE_DATA_INDEX]: "事件类型",
  [ACTION_STATUS_DATA_INDEX]: "操作状态",
  [DES_DATA_INDEX]: "威胁描述"
}

const renderer = {
  [ATTACK_TIMES_DATA_INDEX]: values => <TimeLabel times={values}></TimeLabel>,
  [DES_DATA_INDEX]: values => {
    try {
      return <div>
        {values.map((value, index) => {
          return (
            <div key={`${index}-item`} style={{ marginBottom: "5px" }}>
              <Tag color={primaryColor}>{value}</Tag>
            </div>
          )
        })}
      </div>
    } catch (e) {
      console.error(e)
    }
  },
  [ACTION_STATUS_DATA_INDEX]: value => {
    return (
      <Choose>
        <When condition={value === 1}>
          <span><Badge status="success"></Badge>成功</span>
        </When>
        <When condition={value === 0}>
          <span><Badge status="error"></Badge>失败</span>
        </When>
        <Otherwise>
          <span><Badge status="warning"></Badge>未知</span>
        </Otherwise>
      </Choose>
    )
  }
}

export const getColumns = () => {
  return columnsCreator({
    dataIndexes,
    titleConfig: locale,
    renderer
  })
}