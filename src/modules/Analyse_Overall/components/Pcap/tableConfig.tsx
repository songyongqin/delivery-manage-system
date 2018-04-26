import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import * as tools from '../../../../utils/tools';

import TimesLabel from 'components/TimeLabel'
import columnsCreator from 'domainUtils/columnsCreator'
import Tag from 'components/Tag'
import { Popover } from 'antd'

export const TIME_DATA_INDEX = "time",
  PACKAGE_NAME_DATA_INDEX = "packageName",
  DOWNLOAD_URL_DATA_INDEX = "downloadUrl"


export const dataIndexes = [
  TIME_DATA_INDEX,
  PACKAGE_NAME_DATA_INDEX,
  DOWNLOAD_URL_DATA_INDEX
]

export const textConfig = {
  [TIME_DATA_INDEX]: "时间",
  [PACKAGE_NAME_DATA_INDEX]: "Pcap包文件名字",
  [DOWNLOAD_URL_DATA_INDEX]: "Pcap包"
}

const filterDataIndexes = [
  PACKAGE_NAME_DATA_INDEX
]

const filterFormTextConfig = {
  [PACKAGE_NAME_DATA_INDEX]: {
    label: "PCAP包文件名",
    placeholder: "如：dumppcap7"
  },
}
const OVER_FLOW_LENGTH = 40;

export const getColumns = (option) =>
  columnsCreator({
    dataIndexes,
    titleConfig: textConfig,
    renderer: {
      [TIME_DATA_INDEX]: value => <TimesLabel value={value}></TimesLabel>,
      [DOWNLOAD_URL_DATA_INDEX]: (value, records) => <a href={value} download={records[PACKAGE_NAME_DATA_INDEX]}>下载</a>
    },

  })