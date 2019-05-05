import * as React from 'react'
import columnsCreator from 'domainUtils/columnsCreator'
import TimeLabel from 'domainComponents/TimeLabel'
import Tag from 'components/Tag'
import { primaryColor } from 'themes/vars'
import { Badge, Popover } from 'antd'
import { Choose, When, Otherwise } from 'components/ControlStatements'
import OverflowTextWrapper from 'components/OverflowTextWrapper'

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
  [BANNER]: (value) => {
    const n = Math.ceil(value.length / 500);
    const leg = Math.ceil(value.length / (value.length <= 500 ? 3 : 3 * n));
    const arr = length => Array.from({ length }).map((v, k) => k);
    const content = (
      <div  >
        {
          arr(3 * n).map((i) => <span key={i} style={{ wordBreak: 'break-all' }}  >{value.substring(leg * i, leg * (i + 1))}</span>)
        }
      </div>
    );
    return value.length <= 100 ? <div  >{value}</div> : <OverflowTextWrapper content={content} >{value}</OverflowTextWrapper>
    // return <div style={{ maxHeight: '4.5em', lineHeight:'1.5em', overflow:'hidden', breakAfter:'left'  }} >{ value }</div>
  }
}
const extraProps = {
  [BANNER]: { width: "350px" }
}
export const getColumns = () => {
  return columnsCreator({
    dataIndexes,
    titleConfig: locale,

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