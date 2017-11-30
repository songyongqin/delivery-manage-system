import React from 'react';
import tableColumnsGenerator from '../../../../utils/tableColumnsGenerator';
import moment from 'moment';
import classnames from 'classnames';
import * as tools from '../../../../utils/tools';
import {
  dataIndexesConfig,
  PROTOCOL_TYPE_DATA_INDEX,
  URL_DATA_INDEX,
  ATTACK_TIME_DATA_INDEX,
  textConfig,
  dataIndexes,
  attackStage,
  attackStageTextConfig,
  // level,
  // levelTextConfig,
  actionStatus,
  actionStatusTextConfig,
  ACTIONSTATUS_SUCCESS,
  ACTIONSTATUS_FAIL,
  DETAILS_DATA_INDEX,
  ATTACK_STAGE_DATA_INDEX,
  ACTION_STATUS_DATA_INDEX,
  LEVEL_DATA_INDEX,
  PCAP_DATA_INDEX,
  TOOL_DATA_INDEX,
  SOURCE_IP_DATA_INDEX,
  TARGET_IP_DATA_INDEX,
  SOURCE_PORT_DATA_INDEX,
  TARGET_PORT_DATA_INDEX
} from '../../ConstConfig'
import TimesLabel from '../../../../components/TimesLabel';
import JoTag from '../../../../components/JoTag';
import { Popover, Badge, Timeline, Icon } from 'antd';
import Card from '../../../../domainComponents/Card';
import FilterDropdownWrapper from 'domainComponents/FilterDropdownWrapper'
import SearchFilterForm from 'domainComponents/SearchFilterForm'
import getFilterForm from 'utils/getFilterForm'


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

export const commonFilters = {
  [ATTACK_STAGE_DATA_INDEX]: attackStage,
  [ACTION_STATUS_DATA_INDEX]: actionStatus,
  [LEVEL_DATA_INDEX]: level,
}

export const commonFilterTextConfig = {
  [ATTACK_STAGE_DATA_INDEX]: attackStageTextConfig,
  [ACTION_STATUS_DATA_INDEX]: actionStatusTextConfig,
  [LEVEL_DATA_INDEX]: levelTextConfig,
}

const filterDataIndexes = [
  SOURCE_IP_DATA_INDEX,
  TARGET_IP_DATA_INDEX,
  SOURCE_PORT_DATA_INDEX,
  TARGET_PORT_DATA_INDEX,
]

const filterFormTextConfig = {
  [SOURCE_IP_DATA_INDEX]: {
    label: "攻击源IP",
    placeholder: "请输入IP"
  },
  [TARGET_IP_DATA_INDEX]: {
    label: "目的IP",
    placeholder: "请输入IP"
  },
  [TARGET_PORT_DATA_INDEX]: {
    label: "目的端口",
    placeholder: "如:8080"
  },
  [SOURCE_PORT_DATA_INDEX]: {
    label: "源端口",
    placeholder: "如:8080"
  }
}



const OVER_FLOW_LENGTH = 40;

export const getColumns = ({ queryFilters, filters = {}, filterTextConfig = {}, onQuery } = {}) =>
  tableColumnsGenerator({
    keys: dataIndexes,
    filterOptions: { ...commonFilters, ...filters, },
    filterTextConfig: { ...commonFilterTextConfig, ...filterTextConfig },
    titleTextConfig: textConfig,
    filteredValue: queryFilters,
    renderer: {
      [PCAP_DATA_INDEX]: (value, records) => <a href={value} download="pcap" onClick={e => e.stopPropagation()}>下载</a>,
      [ATTACK_TIME_DATA_INDEX]: value => <TimesLabel times={value}></TimesLabel>,
      [LEVEL_DATA_INDEX]: value => tools.getKeyText(value, levelTextConfig),
      [ATTACK_STAGE_DATA_INDEX]: value => tools.getKeyText(value, attackStageTextConfig),
      [TOOL_DATA_INDEX]: value => tools.getKeyText(value, filterTextConfig[TOOL_DATA_INDEX]),
      [ACTION_STATUS_DATA_INDEX]: value => {
        if (value === ACTIONSTATUS_SUCCESS) {
          return <span><Badge status="success" />{tools.getKeyText(value, actionStatusTextConfig)}</span>
        }
        if (value === ACTIONSTATUS_FAIL) {
          return <span><Badge status="error" />{tools.getKeyText(value, actionStatusTextConfig)}</span>
        }
        return <span><Badge status="warning" />{tools.getKeyText(value, actionStatusTextConfig)}</span>

      },
    },
    extraProps: {
      ...getFilterForm({ queryFilters, onQuery, dataIndexes: filterDataIndexes, textConfig: filterFormTextConfig })
    }
  })

export const expandedRowRender = records => {
  const details = records[DETAILS_DATA_INDEX] || []
  return <Card title="行为详细描述">
    <Timeline>
      {details.map((i, index) => {
        return (
          <Timeline.Item key={`${index}-timeline-item`}>
            <div>
              <JoTag color="#108ee9">{i.title}</JoTag>
              <br /><br />
              {i["description"]}
            </div>
          </Timeline.Item>
        )
      })}
    </Timeline>
  </Card>
}