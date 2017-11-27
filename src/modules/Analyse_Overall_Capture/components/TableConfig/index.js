import React from 'react';
import tableColumnsGenerator from '../../../../utils/tableColumnsGenerator';
import moment from 'moment';
import classnames from 'classnames';
import * as tools from '../../../../utils/tools';
import {
  dataIndexes,
  PROTOCOL_TYPE_DATA_INDEX,
  URL_DATA_INDEX,
  TIME_DATA_INDEX,
  textConfig,
  DOWNLOAD_URL_DATA_INDEX,
  FILE_NAME_DATA_INDEX,
  MD5_DATA_INDEX,
  FAMILY_DATA_INDEX
} from '../../ConstConfig'
import TimesLabel from '../../../../components/TimesLabel';
import JoTag from '../../../../components/JoTag';
import { Popover } from 'antd';
import getFilterForm from 'utils/getFilterForm'

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

export const getColumns = ({ queryFilters, onQuery } = {}) =>
  tableColumnsGenerator({
    keys: dataIndexes,
    titleTextConfig: textConfig,
    filteredValue: queryFilters,
    renderer: {
      [TIME_DATA_INDEX]: value => <TimesLabel times={[value]}></TimesLabel>,
      [DOWNLOAD_URL_DATA_INDEX]: (value, records) => <a href={value} download={records[FILE_NAME_DATA_INDEX]}>下载</a>
    },
    extraProps: {
      ...getFilterForm({
        dataIndexes: filterDataIndexes,
        textConfig: filterFormTextConfig,
        onQuery,
        queryFilters,
      })
    }
  })