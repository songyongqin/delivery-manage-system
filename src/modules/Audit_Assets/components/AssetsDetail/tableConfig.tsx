import * as React from 'react'
import columnsCreator from 'domainUtils/columnsCreator'
import TimeLabel from 'domainComponents/TimeLabel'
import Tag from 'components/Tag'
import { primaryColor } from 'themes/vars'
import { Badge } from 'antd'
import { Choose, When, Otherwise } from 'components/ControlStatements'

const LOOPHOLENAME = "loopholeName",
  RELATIONPORT = "relationPort",
  LOOPHOLETYPE = "loopholeType",
  LOOPHOLEDESCRITION = "loopholeDescrition",
  LEVEL = "level",
  REPAIRPROGRAMME = "repairProgramme"


const PORT = "port",
  SERBICETYPE = "serviceType",
  WEBDEVLANGUAGE = "webDevlanguage",
  CMS = "CMS",
  BANNER = "banner"


const dataIndexes = [
  LOOPHOLENAME,
  RELATIONPORT,
  LOOPHOLETYPE,
  LOOPHOLEDESCRITION,
  LEVEL,
  REPAIRPROGRAMME
]

const locale = {
  [LOOPHOLENAME]: "漏洞名称",
  [RELATIONPORT]: "关联端口",
  [LOOPHOLETYPE]: "漏洞类型",
  [LOOPHOLEDESCRITION]: "漏洞描述",
  [LEVEL]: "危害等级",
  [REPAIRPROGRAMME]: "补修方案"
}

const dataIndexes_port = [
  PORT,
  SERBICETYPE,
  WEBDEVLANGUAGE,
  CMS,
  BANNER
]

const locale_port = {
  [PORT]: "端口",
  [SERBICETYPE]: "服务类型",
  [WEBDEVLANGUAGE]: "Web开发语言",
  [CMS]: "Web内容管理系统",
  [BANNER]: "指纹"
}

const renderer = {

  // [ACTION_STATUS_DATA_INDEX]: value => {
  //   return (
  //     <Choose>
  //       <When condition={value === 1}>
  //         <span><Badge status="success"></Badge>成功</span>
  //       </When>
  //       <When condition={value === 0}>
  //         <span><Badge status="error"></Badge>失败</span>
  //       </When>
  //       <Otherwise>
  //         <span><Badge status="warning"></Badge>未知</span>
  //       </Otherwise>
  //     </Choose>
  //   )
  // }
}

export const getColumns = () => {
  return columnsCreator({
    dataIndexes,
    titleConfig: locale,
    renderer
  })
}

export const getColumns_port = () => {
  return columnsCreator({
    dataIndexes: dataIndexes_port,
    titleConfig: locale_port
  })
}