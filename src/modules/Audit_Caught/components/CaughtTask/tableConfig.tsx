import * as React from 'react'
import { Button } from 'antd'
import columnsCreator from 'domainUtils/columnsCreator'
import Tag from 'components/Tag'
import TimeLabel from 'components/TimeLabel'
import { download } from 'utils/download'
export const
  KEY = "key",
  ID = "id",
  TASKNAME = "taskName",
  STARTTIME = "startTime",
  IP = "ip",
  TIME = "time",
  SIZE = "size",
  STATUS = "status",
  OPERATE = "operate"

export const dataIndexes = [
  // KEY,
  TASKNAME,
  STARTTIME,
  IP,
  TIME,
  SIZE,
  STATUS,
  OPERATE
]
export const textConfig = {
  // [KEY]: "序号",
  [TASKNAME]: "任务名称",
  [STARTTIME]: "抓包开始时间",
  [IP]: "抓包IP",
  [TIME]: "抓包时长设置",
  [SIZE]: "抓包大小设置",
  [STATUS]: "状态",
  [OPERATE]: "操作"
}


export const getColumns = ({ taskId, putTask, delTask }) => {

  return columnsCreator({
    dataIndexes: dataIndexes,
    titleConfig: textConfig,
    renderer: {
      [STATUS]: (value) => value == "Waiting" ? "等待中" : value == "Catching" ? "抓包中" : value == "Cancel" ? "已取消" : null,
      [STARTTIME]: (value) => <TimeLabel value={value}></TimeLabel>,
      [OPERATE]: (value, record) => <Button type="primary" size="small" onClick={() => taskId == record.id ? delTask(record.id) : putTask(record.id)}>{taskId == record.id ? "删除任务" : "取消任务"}</Button>,
    }
  })
}