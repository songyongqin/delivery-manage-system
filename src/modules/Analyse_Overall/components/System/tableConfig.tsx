import * as React from 'react'
import moment from 'moment'
import classnames from 'classnames'
import * as tools from 'utils'
import TagList from 'components/TagList'
import {
  // PROTOCOL_TYPE_DATA_INDEX,
  // URL_DATA_INDEX,
  // TIME_DATA_INDEX,
  PATH_DATA_INDEX,
  textConfig,
  // DOWNLOAD_URL_DATA_INDEX,
  // FILE_NAME_DATA_INDEX,
  ATTACKSTAGE_DATAINDEX,
  ACTIONSTATUS_DATAINDEX,
  LEVEL_DATAINDEX,
  // attackStage,
  // attackStageTextConfig,
  // level,
  // levelTextConfig,
  // actionStatus,
  // actionStatusTextConfig,
  // ACTIONSTATUS_SUCCESS,
  // ACTIONSTATUS_FAIL,
  DETAILS_DATA_INDEX,
  TIME_DATA_INDEX,
  ACTION_MAIN_DATA_INDEX,
  ACTION_TARGET_DATA_INDEX,
  HONEYPOT_IP_DATA_INDEX,
  ACTION_DATAINDEX,

} from '../../constants'
import columnsCreator from 'domainUtils/columnsCreator'
import TimesLabel from 'components/TimeLabel'
import { Popover, Badge, Timeline } from 'antd'
import Card from 'domainComponents/Card'
import Tag from 'components/Tag'


export const HIGH = "high",
  MIDDLE = "middle",
  LOW = "low",
  UN_KNOW = "unknow";


export const levelTextConfig = {
  [HIGH]: "高危",
  [MIDDLE]: "中危",
  [LOW]: "低危",
  [UN_KNOW]: "未知"
};

export const level = Object.keys(levelTextConfig)

const filterDataIndexes = [
  PATH_DATA_INDEX
]

const filterFormTextConfig = {
  [PATH_DATA_INDEX]: {
    label: "操作路径",
    placeholder: "如：windows"
  },

}


// export const commonFilters = {
//   [ATTACKSTAGE_DATAINDEX]: attackStage,
//   [ACTIONSTATUS_DATAINDEX]: actionStatus,
//   [LEVEL_DATAINDEX]: level,
// }

// export const commonFilterTextConfig = {
//   [ATTACKSTAGE_DATAINDEX]: attackStageTextConfig,
//   [ACTIONSTATUS_DATAINDEX]: actionStatusTextConfig,
//   [LEVEL_DATAINDEX]: levelTextConfig,
// }
const dataIndexes = [
  TIME_DATA_INDEX,
  HONEYPOT_IP_DATA_INDEX,
  ACTION_MAIN_DATA_INDEX,

  // ATTACKSTAGE_DATAINDEX,
  ACTION_DATAINDEX,
  ACTION_TARGET_DATA_INDEX,
  // ACTIONSTATUS_DATAINDEX,
  // LEVEL_DATAINDEX,
  // PATH_DATA_INDEX,
]


const renderer = {
  [TIME_DATA_INDEX]: value => <TimesLabel times={value}></TimesLabel>,
  [LEVEL_DATAINDEX]: value => tools.getKeyText(value, levelTextConfig),

  // [TIME_DATA_INDEX]: value => {
  //   return <TimesLabel times={[value]}></TimesLabel>
  // },
}

export const getColumns = (option) =>
  columnsCreator({
    dataIndexes,
    titleConfig: textConfig,
    renderer,
  })