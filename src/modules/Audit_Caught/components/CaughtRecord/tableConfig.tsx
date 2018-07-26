import * as React from 'react'
import { Button } from 'antd'
import columnsCreator from 'domainUtils/columnsCreator'
import Tag from 'components/Tag'
import TimeLabel from 'components/TimeLabel'
import { download } from 'utils/download'
export const
  KEY = "key",
  TASKNAME = "taskName",
  STARTTIME = "startTime",
  ENDTIME = "endTime",
  IP = "ip",
  TIME = "time",
  SIZE = "size",
  PACKSIZE = "packSize",
  DOWNLOAD = "download"

export const dataIndexes = [
  // KEY,
  TASKNAME,
  STARTTIME,
  ENDTIME,
  IP,
  TIME,
  SIZE,
  PACKSIZE,
  DOWNLOAD
]
export const textConfig = {
  // [KEY]: "序号",
  [TASKNAME]: "任务名称",
  [STARTTIME]: "抓包开始时间",
  [ENDTIME]: "抓包结束时间",
  [IP]: "抓包IP",
  [TIME]: "抓包时长设置",
  [SIZE]: "抓包大小设置",
  [PACKSIZE]: "pack包大小",
  [DOWNLOAD]: "操作"
}


export const getColumns = ({ }) => {
  return columnsCreator({
    dataIndexes: dataIndexes,
    titleConfig: textConfig,
    renderer: {
      [STARTTIME]: (value) => <TimeLabel value={value}></TimeLabel>,
      [ENDTIME]: (value) => <TimeLabel value={value}></TimeLabel>,
      [DOWNLOAD]: (value, record) => <div><a download href={value}>下载</a></div>
    }
  })
}