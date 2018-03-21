import React from 'react';
import tableColumnsGenerator from '../../../../utils/tableColumnsGenerator';
import moment from 'moment';
import classnames from 'classnames';
import * as tools from '../../../../utils/tools';
import {
  commonDataIndexes,
  nodeDataIndexes,
  monitorLogTextConfig,
  MONITOR_LOG_TIME_DATA_INDEX,
  MONITOR_LOG_IP_DATA_INDEX,
  MONITOR_LOG_RESULT_DATA_INDEX,
  REGULAR_MODULE_ROW_KEY,
  ERROR_MODULE_ROW_KEY,
  ERROR_VALUE,
  REGULAR_VALUE
} from '../../ConstConfig'
import TimesLabel from '../../../../components/TimesLabel';
import JoTag from '../../../../components/JoTag';
const getRenderer = ({ moduleMonitorTextConfig }) => (
  {
    [MONITOR_LOG_TIME_DATA_INDEX]: value => <TimesLabel times={[value]}></TimesLabel>,
    [REGULAR_MODULE_ROW_KEY]: (value, records) => {
      let moduleList = records[MONITOR_LOG_RESULT_DATA_INDEX];
      const data = Object.keys(moduleList).filter(i => moduleList[i] === REGULAR_VALUE);
      return <div>
        {
          data.map((i, index) => (
            <JoTag color="green"
              key={`${index}-tag`}>
              {tools.getKeyText(i, moduleMonitorTextConfig)}
            </JoTag>
          ))
        }
      </div>
    },
    [ERROR_MODULE_ROW_KEY]: (value, records) => {
      let moduleList = records[MONITOR_LOG_RESULT_DATA_INDEX];
      const data = Object.keys(moduleList).filter(i => moduleList[i] === ERROR_VALUE);
      return <div>
        {
          data.map((i, index) => (
            <JoTag color="red"
              key={`${index}-tag`}>
              {tools.getKeyText(i, moduleMonitorTextConfig)}
            </JoTag>
          ))
        }
      </div>
    }
  }
)

export const getCommonColumns = ({ moduleMonitorTextConfig } = {}) =>
  tableColumnsGenerator({
    keys: commonDataIndexes,
    titleTextConfig: monitorLogTextConfig,
    renderer: getRenderer({ moduleMonitorTextConfig }),
  })


export const getNodeColumns = ({ moduleMonitorTextConfig } = {}) =>
  tableColumnsGenerator({
    keys: nodeDataIndexes,
    titleTextConfig: monitorLogTextConfig,
    renderer: getRenderer({ moduleMonitorTextConfig }),
  })