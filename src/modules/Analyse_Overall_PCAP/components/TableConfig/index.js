import React from 'react';
import tableColumnsGenerator from '../../../../utils/tableColumnsGenerator';
import moment from 'moment';
import classnames from 'classnames';
import * as tools from '../../../../utils/tools';
import {
  dataIndexes,
  URL_DATA_INDEX,
  TIME_DATA_INDEX,
  textConfig,
  DOWNLOAD_URL_DATA_INDEX,
  PACKAGE_NAME_DATA_INDEX,
} from '../../ConstConfig'
import TimesLabel from '../../../../components/TimesLabel';
import JoTag from '../../../../components/JoTag';
import { Popover } from 'antd';
import getFilterForm from 'utils/getFilterForm'

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

export const getColumns = ({ queryFilters, onQuery } = {}) =>
  tableColumnsGenerator({
    keys: dataIndexes,
    titleTextConfig: textConfig,
    filteredValue: queryFilters,
    renderer: {
      [TIME_DATA_INDEX]: value => <TimesLabel times={[value]}></TimesLabel>,
      [DOWNLOAD_URL_DATA_INDEX]: (value, records) => <a href={value} download={records[PACKAGE_NAME_DATA_INDEX]}>下载</a>
    },
    extraProps: {
      ...getFilterForm({ dataIndexes: filterDataIndexes, textConfig: filterFormTextConfig, onQuery, queryFilters })
    }
  })