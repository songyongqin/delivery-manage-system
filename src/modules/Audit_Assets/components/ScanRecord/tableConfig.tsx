import * as React from 'react'
import columnsCreator from 'domainUtils/columnsCreator'
import TimeLabel from 'domainComponents/TimeLabel'
import TagList from 'components/TagList'
import { primaryColor } from 'themes/vars'
import { Badge, Button } from 'antd'
import { Choose, When, Otherwise } from 'components/ControlStatements'

const ISSCANNING = "isScanning",
  SCANCYCLE = "scanCycle",
  STARTTIME = "startTime",
  SCANIPRANGE = "scanIpRange",
  CHECKPORT = "checkPort",

  SCANTIME = "scanTime",
  SCANASSETSCOUNT = "scanAssetsCount",
  NEWASSETSCOUNT = "newAssetsCount",
  NEWPORTCOUNT = "newPortCount",
  STATE = "state",
  OPERATE = "operate"

const dataIndexes = [
  STARTTIME,
  SCANCYCLE,
  SCANIPRANGE,
  CHECKPORT,
  STATE
]

const locale = {
  [STARTTIME]: "计划扫描时间",
  [SCANCYCLE]: "扫描周期",
  [SCANIPRANGE]: "扫描IP范围",
  [CHECKPORT]: "检测端口",
  [STATE]: "扫描状态"
}

const dataIndexes_record = [
  SCANTIME,
  SCANIPRANGE,
  SCANASSETSCOUNT,
  NEWASSETSCOUNT,
  NEWPORTCOUNT,
  STATE,
  OPERATE
]

const locale_record = {
  [SCANTIME]: "扫描时间",
  [SCANIPRANGE]: "扫描IP范围",
  [SCANASSETSCOUNT]: "扫描资产数",
  [NEWASSETSCOUNT]: "新增资产数",
  [NEWPORTCOUNT]: "新增端口数",
  [STATE]: "状态",
  [OPERATE]: "操作"
}

const renderer = {

  [STARTTIME]: value => {
    return (
      <TimeLabel value={value}></TimeLabel>
    )
  },
  [SCANIPRANGE]: value => <TagList data={value} maxCount={4}></TagList>,
  [CHECKPORT]: value => <TagList data={value} maxCount={4}></TagList>
}

export const getColumns = () => {
  return columnsCreator({
    dataIndexes,
    titleConfig: locale,
    renderer
  })
}

export const getColumns_record = ({ showDetailModal }) => {
  return columnsCreator({
    dataIndexes: dataIndexes_record,
    titleConfig: locale_record,
    renderer: {
      [SCANTIME]: value => {
        return (
          <TimeLabel value={value}></TimeLabel>
        )
      },
      [SCANIPRANGE]: value => <TagList data={value} maxCount={4}></TagList>,
      [OPERATE]: (value, record) => <Button type="primary" size="small" onClick={() => showDetailModal(record[SCANTIME])}>详情</Button>
    }
  })
}