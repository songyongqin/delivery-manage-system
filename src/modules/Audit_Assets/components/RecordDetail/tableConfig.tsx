import * as React from 'react'
import columnsCreator from 'domainUtils/columnsCreator'
import TimeLabel from 'domainComponents/TimeLabel'
import Tag from 'components/Tag'
import { primaryColor } from 'themes/vars'
import { Badge, Popover } from 'antd'
import { Choose, When, Otherwise } from 'components/ControlStatements'
import OverflowTextWrapper from 'components/OverflowTextWrapper'

const IP = "ip",
  PORTSERVICE = "port"

const dataIndexes = [
  IP,
  PORTSERVICE
]

const locale = {
  [IP]: "资产IP",
  [PORTSERVICE]: "端口 服务"
}

const dataIndexes_port = [
  PORTSERVICE,
  IP
]

const locale_port = {
  [PORTSERVICE]: "端口 服务",
  [IP]: "资产IP"
}

const renderer = {
  [PORTSERVICE]: (value, record) => <ul style={{ listStyle: "none", padding: "0px" }}>{record.portService.map((i) => <li>{i.port}&nbsp;&nbsp;<Tag color="rgb(16, 142, 233)" >{i.service}</Tag></li>)}</ul>
}

const extraProps = {
  [PORTSERVICE]: { width: "250px" },
  [IP]: { width: "250px" }
}
export const getColumns = () => {
  return columnsCreator({
    dataIndexes,
    titleConfig: locale,
    renderer,
    extraProps
  })
}

export const getColumns_port = () => {
  return columnsCreator({
    dataIndexes: dataIndexes_port,
    titleConfig: locale_port,
    renderer,
    extraProps
  })
}