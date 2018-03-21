import React from 'react';
import tableColumnsGenerator from '../../../../utils/tableColumnsGenerator';
import moment from 'moment';
import classnames from 'classnames';
import * as tools from '../../../../utils/tools';
import TagList from 'components/TagList'
import {
  dataIndexes,
  PROTOCOL_TYPE_DATA_INDEX,
  URL_DATA_INDEX,
  // TIME_DATA_INDEX,
  PATH_DATA_INDEX,
  textConfig,
  DOWNLOAD_URL_DATA_INDEX,
  FILE_NAME_DATA_INDEX,
  ATTACKSTAGE_DATAINDEX,
  ACTIONSTATUS_DATAINDEX,
  LEVEL_DATAINDEX,
  attackStage,
  attackStageTextConfig,
  // level,
  // levelTextConfig,
  actionStatus,
  actionStatusTextConfig,
  ACTIONSTATUS_SUCCESS,
  ACTIONSTATUS_FAIL,
  DETAILS_DATA_INDEX,
  TIME_DATA_INDEX,
  ACTION_MAIN_DATA_INDEX,
  ACTION_TARGET_DATA_INDEX

} from '../../ConstConfig'
import TimesLabel from '../../../../components/TimesLabel';
import JoTag from '../../../../components/JoTag';
import { Popover, Badge, Timeline } from 'antd';
import Card from '../../../../domainComponents/Card';
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

const filterDataIndexes = [
  PATH_DATA_INDEX
]

const filterFormTextConfig = {
  [PATH_DATA_INDEX]: {
    label: "操作路径",
    placeholder: "如：windows"
  },

}


export const commonFilters = {
  [ATTACKSTAGE_DATAINDEX]: attackStage,
  [ACTIONSTATUS_DATAINDEX]: actionStatus,
  [LEVEL_DATAINDEX]: level,
}

export const commonFilterTextConfig = {
  [ATTACKSTAGE_DATAINDEX]: attackStageTextConfig,
  [ACTIONSTATUS_DATAINDEX]: actionStatusTextConfig,
  [LEVEL_DATAINDEX]: levelTextConfig,
}



const renderer = {
  [TIME_DATA_INDEX]: value => <TimesLabel times={[value]}></TimesLabel>,
  [LEVEL_DATAINDEX]: value => tools.getKeyText(value, levelTextConfig),
  [ATTACKSTAGE_DATAINDEX]: value => tools.getKeyText(value, attackStageTextConfig),
  [DOWNLOAD_URL_DATA_INDEX]: (value, records) => <a href={value} download={records[FILE_NAME_DATA_INDEX]}>下载</a>,
  [ACTIONSTATUS_DATAINDEX]: value => {
    if (value === ACTIONSTATUS_SUCCESS) {
      return <span><Badge status="success" />{tools.getKeyText(value, actionStatusTextConfig)}</span>
    }
    if (value === ACTIONSTATUS_FAIL) {
      return <span><Badge status="error" />{tools.getKeyText(value, actionStatusTextConfig)}</span>
    }
    return <span><Badge status="warning" />{tools.getKeyText(value, actionStatusTextConfig)}</span>

  },
  [PATH_DATA_INDEX]: value => {
    value = value || [];
    return <div>
      {
        value.map((i, index) => <JoTag color="#108ee9" key={`${index}-tag`} >{i}</JoTag>)
      }
    </div>
  },
  // [TIME_DATA_INDEX]: value => {
  //   return <TimesLabel times={[value]}></TimesLabel>
  // },
}

export const getColumns = ({ onQuery, queryFilters, filterTextConfig = {}, filters = {} } = {}) =>
  tableColumnsGenerator({
    keys: dataIndexes,
    titleTextConfig: textConfig,
    filteredValue: queryFilters,
    filterOptions: { ...commonFilters, ...filters },
    filterTextConfig: { ...commonFilterTextConfig, ...filterTextConfig },
    renderer,
    extraProps: {
      ...getFilterForm({ dataIndexes: filterDataIndexes, textConfig: filterFormTextConfig, onQuery, queryFilters })
    }
  })



export const expandedRowRender = records => {
  const details = records[DETAILS_DATA_INDEX] || []

  const path = records[PATH_DATA_INDEX] || []
  return <Card title="ObjectPath">
    <TagList data={path}></TagList>
    {/* <Timeline>
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
    </Timeline> */}
  </Card>
}