import * as React from 'react'
import { Button } from 'antd'
import columnsCreator from 'domainUtils/columnsCreator'
import Tag from 'components/Tag'
export const ASSETSIP = "assetsIp",
  ASSETSTATES = "assetStates",
  HOSTNAME = "hostName",
  OS = "os",
  PORTCOUNT = "portCount",
  LOOPHOLECOUNT = "loopholeCount",
  SCANTIME = "scanTime",
  ASSETSNAME = "assetsName",
  OPERATE = "operate"

export const dataIndexes = [
  ASSETSIP,
  ASSETSTATES,
  HOSTNAME,
  OS,
  PORTCOUNT,
  LOOPHOLECOUNT,
  SCANTIME,
  ASSETSNAME,
  OPERATE
]
export const textConfig = {
  [ASSETSIP]: "资产IP",
  [ASSETSTATES]: "状态",
  [HOSTNAME]: "主机名",
  [OS]: "操作系统",
  [PORTCOUNT]: "端口数量",
  [LOOPHOLECOUNT]: "漏洞数量",
  [SCANTIME]: "扫描时间",
  [ASSETSNAME]: "资产名称",
  [OPERATE]: "操作"
}




export const getColumns = ({ filters, showDetailModal, showEditModal }) => {
  return columnsCreator({
    dataIndexes: dataIndexes,
    titleConfig: textConfig,
    renderer: {
      [OPERATE]: (value, record) => <div><Button type="primary" size="small" onClick={showDetailModal}>详情</Button>&nbsp;<Button type="primary" size="small" onClick={_ => showEditModal(record.assetsIp)}>编辑</Button></div>
    }
  })
}