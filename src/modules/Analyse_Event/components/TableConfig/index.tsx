/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
// import tableColumnsGenerator from 'utils/tableColumnsGenerator';
import columnsCreator from 'domainUtils/columnsCreator'
import Tag from 'components/Tag'
import { Icon, Switch, Timeline, InputNumber, Button, Badge } from 'antd'
import classnames from 'classnames'
import * as tools from 'utils'
import Card from 'domainComponents/Card'
// import commonConstConfig from 'configs/ConstConfig';
import {
  filterRowDataIndexes,
  rowDataIndexes,
  tableTextConfig,
  COUNTS_DATAINDEX,
  ACTIONSTATUS_DATAINDEX,
  SOURCE_DATAINDEX,
  PERCEPTION_DATAINDEX,
  ACTION_DATAINDEX,
  HONEYPOT_NAME_DATAINDEX,
  MAC_DATAINDEX,
  DETAILS_DATAINDEX,
  ADVICE_DATAINDEX,
  HONEYPOT_SOURCE,
  IDS_SOURCE,
  sourceTextConfig,
} from '../../constants'
// import FilterInputNumber from '../FilterInputNumber'
import TimeLabel from 'components/TimeLabel'
import CountUp from 'react-countup'

export const INVADE_DATAINDEX = "intrusion",
  INSTALL_DATAINDEX = "install",
  CONTROL_DATAINDEX = "control",
  INTENTION_DATAINDEX = "intention"

export const attackStage = [
  INVADE_DATAINDEX,
  INSTALL_DATAINDEX,
  CONTROL_DATAINDEX,
  INTENTION_DATAINDEX
];

export const attackStageTextConfig = {
  [INVADE_DATAINDEX]: "入侵",
  [INSTALL_DATAINDEX]: "安装",
  [CONTROL_DATAINDEX]: "控制",
  [INTENTION_DATAINDEX]: "意图",
};
/***********************************************************************************************************/
/*
*  威胁等级枚举值
* */
export const HIGH = "high",
  MIDDLE = "middle",
  LOW = "low",
  UN_KNOW = "unknow";


export const levelTextConfig = {
  [HIGH]: "高危",
  [MIDDLE]: "中危",
  [LOW]: "低危",
  // [UN_KNOW]: "未知"
};

export const level = Object.keys(levelTextConfig)
/***********************************************************************************************************/
/*
*  操作状态枚举值
* */
export const ACTIONSTATUS_SUCCESS = 1,
  ACTIONSTATUS_FAIL = 0,
  ACTIONSTATUS_UNKNOW = -1;



export const actionStatusTextConfig = {
  [ACTIONSTATUS_SUCCESS]: "成功",
  [ACTIONSTATUS_FAIL]: "失败",
  [ACTIONSTATUS_UNKNOW]: "未知"
};

export const actionStatus = Object.keys(actionStatusTextConfig)
/***********************************************************************************************************/

export const ORT_SCAN = "port scan",
  BURTE_FORCE_3306 = "burte force 3306",
  BURTE_FORCE_3389 = "burte force 3389",
  CONNECT_3306 = "connect 3306",
  CONNECT_3389 = "connect 3389",
  CONNECT_22 = "connect 22",
  CONNECT_445 = "connect 445",
  CONNECT_23 = "connect 23",
  LOGON_3306 = "logon 3306",
  LOGON_3389 = "logon 3389",
  LOGON_22 = "logon 22",
  MYSQL_SHELLCODE_INJECTION = "mysql shellcode injection",
  MYSQL_REMOTE_CODE_EXECUTE = "mysql remote code execute",
  SMB_SESSION_SETUP = "smb session setup",
  EXPLOIT_ETERNALBLUE = "Exploit EternalBlue",
  ETERNALBLUE_REMOTE_CODE_EXECUTE = "EternalBlue remote code execute",
  DOWNLOAD = "download",
  SET_REGISTRY_AUTORUN = "set registry autorun",
  SELF_DELETING_APPLICATION = "self-deleting application",
  PUT_APPICATION_TO_SYSTEM_PATH = "put appication to system path",
  BUFFER_OVERFLOW = "buffer overflow",
  CONNECT_TO_C2_SERVER = "connect to c&c server",
  HACHER_INPUT_COMMAND = "hacher input command"


export const actionTextConfig = {
  // [ORT_SCAN]: "端口扫描",
  // [BURTE_FORCE_3306]: "爆破:3306",
  // [BURTE_FORCE_3389]: "爆破:3389",
  // [CONNECT_3306]: "连接:3306",
  // [CONNECT_3389]: "连接:3389",
  // [CONNECT_22]: "连接:22",
  // [CONNECT_445]: "连接:445",
  // [CONNECT_23]: "连接:23",
  // [LOGON_3306]: "登录:3306",
  // [LOGON_3389]: "登录:3389",
  // [LOGON_22]: "登录:22",
  // [MYSQL_SHELLCODE_INJECTION]: "3306注入shellcode",
  // [MYSQL_REMOTE_CODE_EXECUTE]: " mysql远程代码执行",
  // [SMB_SESSION_SETUP]: "SMB建立会话",
  // [EXPLOIT_ETERNALBLUE]: "SMB永恒之蓝,远程注入",
  // [ETERNALBLUE_REMOTE_CODE_EXECUTE]: "永恒之蓝远程代码执行",
  // [DOWNLOAD]: "下载",
  // [SET_REGISTRY_AUTORUN]: "设置注册表自启动",
  // [SELF_DELETING_APPLICATION]: "程序自删除",
  // [PUT_APPICATION_TO_SYSTEM_PATH]: "释放EXE至系统路径",
  // [BUFFER_OVERFLOW]: "缓冲区溢出攻击",
  // [CONNECT_TO_C2_SERVER]: "连接c2服务器",
  // [HACHER_INPUT_COMMAND]: "黑客远程攻击命令输入"
}

const action = Object.keys(actionTextConfig);
/***********************************************************************************************************/


const attackEventType = [];

/***********************************************************************************************************/

const commonConstConfig = {
  enums: {
    attackStage,
    level,
    actionStatus,
    action,
  },
  textConfig: {
    attackStage: attackStageTextConfig,
    level: levelTextConfig,
    actionStatus: actionStatusTextConfig,
    action: actionTextConfig,
  }
}








import { getProduction as getProductType } from 'domain/production'
// import { STAND_ALONE, IDS_STAND_ALONE } from 'configs/ConstConfig'
import { IDS_STANDALONE, HONEYPOT_STANDALONE } from 'constants/production'


import TagList from 'components/TagList'

const rowsRenderer = {
  description: value => {

    const color = "#108ee9";

    try {
      return <div>
        {
          value.map((i, index) => {
            return <div key={`${index}-des`}
              style={{ marginBottom: "8px" }}>
              <Tag color={color}
              // color={index%2===0?"#87d068":"#f50"}
              >
                {i}
              </Tag>
            </div>
          })
        }
      </div>
    } catch (e) {
      console.info(e);
    }
  },
  attackTimes: value => {
    return <TimeLabel value={value} />
  },
  counts: value => {
    return <CountUp start={0}
      end={value}
      separator={","}
      useGrouping={true}
      duration={1}
      delay={0} />
  }
};


const renderer = { ...rowsRenderer },
  filterOptions = {};

filterRowDataIndexes.forEach(k => {
  /*添加所有选项*/
  filterOptions[k] = commonConstConfig.enums[k];
  /*单元格内内容文本转化*/
  let targetFilter = commonConstConfig.textConfig[k] || {};
  renderer[k] = value => {
    return value in targetFilter ? targetFilter[value] : value;
  }
});
let actionRenderer = renderer[ACTIONSTATUS_DATAINDEX];

renderer[ACTIONSTATUS_DATAINDEX] = value => {
  if (value === ACTIONSTATUS_SUCCESS) {
    return <span><Badge status="success" />{actionRenderer(value)}</span>
  }
  if (value === ACTIONSTATUS_FAIL) {
    return <span><Badge status="error" />{actionRenderer(value)}</span>
  }
  return <span><Badge status="warning" />{actionRenderer(value)}</span>

}

const FILTER_INPUT_LABEL = ""


export const getColumns = ({ queryFilters, onSubmit, filters, filterTextConfig }) => columnsCreator({
  dataIndexes: rowDataIndexes,
  titleConfig: tableTextConfig.colTitles,
  // filtersTextConfig: { ...commonConstConfig.textConfig, ...filterTextConfig },
  // filtersConfig: { ...filterOptions, ...filters },
  filteredValue: queryFilters,
  renderer: {
    ...renderer,
    // [ACTION_DATAINDEX]: value => tools.getKeyText(value, filterTextConfig[ACTION_DATAINDEX])
  },
  // extraProps: (getProductType() === IDS_STAND_ALONE || getProductType() === STAND_ALONE)
  //   ?
  //   {}
  //   :
  //   {
  //     [COUNTS_DATAINDEX]: {
  //       filterIcon: <Icon type="filter" style={{ color: "#108ee9" }} />,
  //       filterDropdown: <FilterInputNumber textConfig={{ label: FILTER_INPUT_LABEL }}
  //         defaultValue={queryFilters.mergeCounts}
  //         onSubmit={onSubmit} />

  //     }
  //   }
});

const nth1TdStyle = { padding: "10px", width: "120px", textAlign: "center" },
  nth2TdStyle = { padding: "10px" }
export const getExpandedRowRender = ({ isDark }) => {
  const { expandedRow } = tableTextConfig;
  return (records) => {

    const classes = classnames({
      ["expanded-row-dark"]: isDark
    });

    const { details = [], advice } = records;

    const source = records[PERCEPTION_DATAINDEX][SOURCE_DATAINDEX],
      honeypotName = records[PERCEPTION_DATAINDEX][HONEYPOT_NAME_DATAINDEX],
      mac = records[PERCEPTION_DATAINDEX][MAC_DATAINDEX];

    return (
      <Card title={tools.getKeyText("title", expandedRow)}
        className={classes}>
        <table>
          <tbody>
            <tr>
              <td style={nth1TdStyle}>
                {tools.getKeyText(DETAILS_DATAINDEX, expandedRow.rows)}
              </td>
              <td style={nth2TdStyle}>
                <div>
                  <TagList data={details} maxCount={8}></TagList>
                </div>
              </td>
            </tr>

            <tr>
              <td style={nth1TdStyle}>
                {tools.getKeyText(SOURCE_DATAINDEX, expandedRow.rows)}
              </td>

              <td style={nth2TdStyle}>
                <Tag color="#108ee9">
                  {
                    tools.getKeyText(source, sourceTextConfig)
                  }
                </Tag>
              </td>
            </tr>

            {
              source === HONEYPOT_SOURCE
                ?
                <tr>
                  <td style={nth1TdStyle}>
                    {tools.getKeyText(HONEYPOT_NAME_DATAINDEX, expandedRow.rows)}
                  </td>
                  <td style={nth2TdStyle}>
                    <Tag color="#108ee9">{honeypotName}</Tag>
                  </td>
                </tr>
                :
                null
            }

            {
              source === IDS_SOURCE
                ?
                <tr>
                  <td style={nth1TdStyle}>
                    {tools.getKeyText(MAC_DATAINDEX, expandedRow.rows)}
                  </td>
                  <td style={nth2TdStyle}>
                    <Tag color="#108ee9">{mac}</Tag>
                  </td>
                </tr>
                :
                null
            }
          </tbody>
        </table>
      </Card>
    );
  };
};

