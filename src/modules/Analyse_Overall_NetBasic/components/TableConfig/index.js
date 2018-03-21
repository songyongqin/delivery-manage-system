import React from 'react';
import tableColumnsGenerator from '../../../../utils/tableColumnsGenerator';
import moment from 'moment';
import classnames from 'classnames';
import * as tools from '../../../../utils/tools';
import {
  dataIndexesConfig,
  PROTOCOL_TYPE_DATA_INDEX,
  URL_DATA_INDEX,
  TIME_DATA_INDEX,
  THREATJUDGE_DATA_INDEX,
  TARGET_IP_DATA_INDEX,
  TARGET_PORT_DATA_INDEX,
  textConfig,
  SOURCE_IP_DATA_INDEX,
  SOURCE_PORT_DATA_INDEX,
  REQUEST_DOMAIN_DATA_INDEX,
  SENDER_DATA_INDEX,
  RECEIVE_DATA_INDEX,
  THREAT_TYPE_TEXT,
  THREAT_TYPE

} from '../../ConstConfig'
import TimesLabel from '../../../../components/TimesLabel';
import JoTag from '../../../../components/JoTag';
import { Popover, Icon } from 'antd';
import FilterDropdownWrapper from 'domainComponents/FilterDropdownWrapper'
import SearchFilterForm from 'domainComponents/SearchFilterForm'
import getFilterForm from 'utils/getFilterForm'
import { portReg, ipReg } from 'utils/tools'
const OVER_FLOW_LENGTH = 40;

const VALUE_DATA_INDEX = "value";

const filterDataIndexes = [
  URL_DATA_INDEX,
  SOURCE_IP_DATA_INDEX,
  SOURCE_PORT_DATA_INDEX,
  TARGET_IP_DATA_INDEX,
  TARGET_PORT_DATA_INDEX,
  REQUEST_DOMAIN_DATA_INDEX,
  SENDER_DATA_INDEX,
  RECEIVE_DATA_INDEX
]

const filterFormTextConfig = {
  [URL_DATA_INDEX]: {
    placeholder: "请输入部分或完整URL，如baidu.com",
    label: "URL搜索"
  },
  [SOURCE_IP_DATA_INDEX]: {
    label: "源IP搜索",
    placeholder: "请输入IP"
  },
  [TARGET_IP_DATA_INDEX]: {
    label: "目的IP搜索",
    placeholder: "请输入IP"
  },
  [TARGET_PORT_DATA_INDEX]: {
    label: "目的端口搜索",
    placeholder: "请输入端口"
  },
  [SOURCE_PORT_DATA_INDEX]: {
    label: "源端口搜索",
    placeholder: "请输入端口"
  },
  [SENDER_DATA_INDEX]: {
    label: "发件人邮箱",
    placeholder: "请输入发件人邮箱"
  },
  [RECEIVE_DATA_INDEX]: {
    label: "收件人邮箱",
    placeholder: "请输入收件人邮箱"
  },
  [REQUEST_DOMAIN_DATA_INDEX]: {
    label: "域名搜索",
    placeholder: "请输入域名"
  }
}

const ruleConfig = {
  [SOURCE_IP_DATA_INDEX]: [
    {
      pattern: ipReg,
      message: "请输入正确的ip"
    }
  ],
  [TARGET_IP_DATA_INDEX]: [
    {
      pattern: ipReg,
      message: "请输入正确的ip"
    }
  ],
  [TARGET_PORT_DATA_INDEX]: [
    {
      pattern: portReg,
      message: "请输入正确的端口"
    }
  ],
  [SOURCE_PORT_DATA_INDEX]: [
    {
      pattern: portReg,
      message: "请输入正确的端口"
    }
  ],
}


export const getColumns = ({ queryFilters, onQuery, filters, filterTextConfig = {} } = {}) =>
  tableColumnsGenerator({
    keys: dataIndexesConfig[queryFilters[PROTOCOL_TYPE_DATA_INDEX]],
    titleTextConfig: textConfig,
    filteredValue: queryFilters,
    filterOptions: {
      [THREATJUDGE_DATA_INDEX]: THREAT_TYPE
    },
    filterTextConfig: {
      [THREATJUDGE_DATA_INDEX]: THREAT_TYPE_TEXT
    },
    renderer: {
      [TIME_DATA_INDEX]: value => <TimesLabel times={[value]}></TimesLabel>,
      [URL_DATA_INDEX]: value => value.length > OVER_FLOW_LENGTH
        ?
        <Popover content={<p style={{ maxWidth: "400px", wordBreak: "break-all" }}>
          {value}</p>}>
          <span>
            {value.substr(0, 40) + "..."}
          </span>
        </Popover>
        :
        value
    },
    extraProps: {
      ...getFilterForm({
        dataIndexes: filterDataIndexes,
        textConfig: filterFormTextConfig,
        onQuery,
        queryFilters,
        ruleConfig
      })
    }
  })