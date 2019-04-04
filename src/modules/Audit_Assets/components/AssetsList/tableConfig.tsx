import * as React from 'react'
import { Button } from 'antd'
import columnsCreator from 'domainUtils/columnsCreator'
import Tag from 'components/Tag'
import TimeLabel from 'components/TimeLabel'
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
      [SCANTIME]: (value) => <TimeLabel value={value}></TimeLabel>,
      [OPERATE]: (value, record) => <div><Action type="primary" size="small" onClick={() => showDetailModal(record[ASSETSIP])}>详情</Action>&nbsp;<Action type="primary" size="small" onClick={_ => showEditModal(record.assetsIp, record.assetsName)}>编辑</Action></div>
    }
  })
}

const Action = props => <span style={{ color: '#4f5dca', cursor: 'pointer', margin:3 }} onClick={ props.onClick } >{ props.children }</span>