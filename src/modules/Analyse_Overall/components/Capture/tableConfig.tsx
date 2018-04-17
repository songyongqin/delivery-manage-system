import * as  React from 'react'
import moment from 'moment'
import classnames from 'classnames'
import * as tools from 'utils'

import TimesLabel from 'components/TimeLabel'
import columnsCreator from 'domainUtils/columnsCreator'
import Tag from 'components/Tag'
import { Popover } from 'antd';
export const TIME_DATA_INDEX = "time",
  FILE_NAME_DATA_INDEX = "filename",
  MD5_DATA_INDEX = "md5",
  FAMILY_DATA_INDEX = "family",
  DOWNLOAD_URL_DATA_INDEX = "downloadUrl"

export const dataIndexes = [
  TIME_DATA_INDEX,
  FILE_NAME_DATA_INDEX,
  MD5_DATA_INDEX,
  FAMILY_DATA_INDEX,
  DOWNLOAD_URL_DATA_INDEX
]

export const textConfig = {
  [TIME_DATA_INDEX]: "时间",
  [FILE_NAME_DATA_INDEX]: "文件名",
  [MD5_DATA_INDEX]: "MD5",
  [FAMILY_DATA_INDEX]: "家族",
  [DOWNLOAD_URL_DATA_INDEX]: "下载"
}


const filterDataIndexes = [
  FILE_NAME_DATA_INDEX,
  MD5_DATA_INDEX,
  FAMILY_DATA_INDEX,
]

const filterFormTextConfig = {
  [FILE_NAME_DATA_INDEX]: {
    label: "文件名搜索",
    placeholder: "如：DownloadDll.dll"
  },
  [MD5_DATA_INDEX]: {
    label: "MD5搜索",
    placeholder: "如：522a25b556516561651651"
  },
  [FAMILY_DATA_INDEX]: {
    label: "家族搜素",
    placeholder: "如：wanncry"
  }

}
const OVER_FLOW_LENGTH = 40;

export const getColumns = () =>
  columnsCreator({
    dataIndexes,
    titleConfig: textConfig,
    renderer: {
      [TIME_DATA_INDEX]: value => <TimesLabel value={value}></TimesLabel>,
      [DOWNLOAD_URL_DATA_INDEX]: (value, records) => <a href={value} download={records[FILE_NAME_DATA_INDEX]}>下载</a>
    },
    // extraProps: {
    //   ...getFilterForm({
    //     dataIndexes: filterDataIndexes,
    //     textConfig: filterFormTextConfig,
    //     onQuery,
    //     queryFilters,
    //   })
    // }
  })