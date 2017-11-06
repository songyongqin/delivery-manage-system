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
  PACKAGE_NAME_DATA_INDEX
} from '../../ConstConfig'
import TimesLabel from '../../../../components/TimesLabel';
import JoTag from '../../../../components/JoTag';
import { Popover } from 'antd';

const OVER_FLOW_LENGTH = 40;

export const getColumns = ({ queryFilters } = {}) =>
  tableColumnsGenerator({
    keys: dataIndexes,
    titleTextConfig: textConfig,
    renderer: {
      [TIME_DATA_INDEX]: value => <TimesLabel times={[value]}></TimesLabel>,
      [DOWNLOAD_URL_DATA_INDEX]: (value, records) => <a href={value} download={records[PACKAGE_NAME_DATA_INDEX]}>下载</a>
    }
  })