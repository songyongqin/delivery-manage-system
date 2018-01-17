/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import tableColumnsGenerator from '../../../../utils/tableColumnsGenerator';
import styles from './styles.css';
import {
  tableRowDataIndexes,
  tableTextConfig,
  HONEYPOT_TYPE_ROW_KEY,
  INTERCATION_DATAINDEX,
  SYSTEM_DATAINDEX,
  SERVICES_DATAINDEX,
  PORTS_DATAINDEX,
  HONEYPOT_STATUS_DATAINDEX,
  honeypotStatusTextConfig,
  STATUS_RUNNING_VALUE,
  STATUS_STOP_VALUE,
  STATUS_LICENCE_OVERDUE,
  STATUS_ERROR_VALUE,
  OPERATION_ROW_KEY,
  HOST_IP_DATAINDEX,
  HONEYPOT_IP_DATAINDEX,
  HONEYPOT_NAME_DATAINDEX,
  honeypotStatusValues,
  ID_DATAINDEX,
  OPERATION_INIT_VALUE,
  OPERATION_SHUTDOWN_VALUE,
  OPERATION_START_VALUE,
  NODE,
} from '../../ConstConfig';

import {
  INDUSTRIAL_CONTROL_SERVICE,
  systemsTextConfig,
  interactionsTextConfig,
  servicesTextConfig,
  systems,
  interactions,
} from 'configs/ConstConfig';

import { Progress, Row, Col, Badge, Button, Popover, Tooltip, Menu, Dropdown, Icon, Popconfirm, Modal } from 'antd'
import JoTag from 'components/JoTag';
import classnames from 'classnames';
import * as tools from 'utils/tools';



const X_LAYOUT = "x", Y_LAYOUT = "y";

const TagList = ({
                 style = {},
  className = "",
  layout = Y_LAYOUT,
  color = [],
  data = [],
  max = 3,
}) => {

  let colorCount = color.length,
    outerTags = data.slice(0, max),
    isOverflow = outerTags.length < data.length,
    extraTag = isOverflow
      ?
      <Popover key="overflow"
        placement="bottom"
        content={
          <div style={{ overflow: "hidden" }}>
            <TagList {...{
              style,
              className,
              color,
              data: data.slice(max),
              layout: "x",
              max: 1e10
            }} />
          </div>

        }>
        <JoTag key="overflow" style={{ cursor: "pointer" }}>更多内容...</JoTag>
      </Popover>
      :
      null

  return <div style={style} className={className}>
    {
      layout === X_LAYOUT
        ?
        [
          ...outerTags.map((i, index) => (
            <JoTag key={i} color={color[index % colorCount]}>
              {i}
            </JoTag>
          )),
          extraTag,
        ]
        :
        [
          outerTags.map((i, index) => [
            <JoTag key={i} color={color[index % colorCount]}>
              {i}
            </JoTag>,
            <br key={`${i}-br`} />
          ]),
          extraTag,
        ]

    }
  </div>

}


const commonRenderer = value => <p style={{ textAlign: "center" }}>{value}</p>

const honeypotTypeRenderer = (value, records) => {

  const system = records[SYSTEM_DATAINDEX],
    interactions = records[INTERCATION_DATAINDEX],
    services = records[SERVICES_DATAINDEX];

  let data = [
    tools.getKeyText(system, systemsTextConfig),
    tools.getKeyText(interactions, interactionsTextConfig),
  ]

  services.includes(INDUSTRIAL_CONTROL_SERVICE)
    &&
    data.push(tools.getKeyText(INDUSTRIAL_CONTROL_SERVICE, servicesTextConfig))

  return <TagList data={data}
    color={["#108ee9"]}
    style={{ textAlign: "center" }} />
}

const servicesRenderer = value => (
  <TagList style={{ textAlign: "center" }}
    color={["#108ee9"]}
    data={value.map(i => tools.getKeyText(i, servicesTextConfig))} />
)

const portsRenderer = value => (
  <TagList style={{ textAlign: "center" }}
    color={["#108ee9"]}
    data={value} />
)

const statusColor = {
  [STATUS_RUNNING_VALUE]: "#3dbd7d",
  [STATUS_LICENCE_OVERDUE]: "#f56a00",
  [STATUS_ERROR_VALUE]: "#f04134",
  [STATUS_STOP_VALUE]: "#bfbfbf"
}


const ERROR_TIP = "因镜像操作系统原因导致蜜罐状态异常，请重启蜜罐或删除该蜜罐重新创建";

const honeypotStatusRenderer = value => {
  let color = [], data = [];

  value.forEach(i => {
    color.push(tools.getKeyText(i, statusColor));

    if (i === STATUS_ERROR_VALUE) {
      return data.push(<Tooltip title={ERROR_TIP}>
        <span style={{ cursor: "pointer" }}>
          {tools.getKeyText(i, honeypotStatusTextConfig)}
        </span>
      </Tooltip>)
    }
    data.push(tools.getKeyText(i, honeypotStatusTextConfig))
  })

  return <TagList style={{ textAlign: "center" }}
    max={10}
    color={color}
    data={data} />

}

const getOperationRenderer = (handle = {}, productType) => (value, records) => {
  let status = records[HONEYPOT_STATUS_DATAINDEX]
  const isLicenceOverdue = status.includes(STATUS_LICENCE_OVERDUE),
    isRunning = (status.includes(STATUS_RUNNING_VALUE)),
    isStop = (status.includes(STATUS_STOP_VALUE)),
    isNodeProductType = productType === NODE,
    menu = (
      <Menu onClick={({ key }) => {
        if (key === "start") {
          handle.getPutHandle({
            value: OPERATION_START_VALUE,
            honeypotList: [records[ID_DATAINDEX]]
          })()
        }

        if (key === "poweroff") {
          Modal.confirm({
            onOk: handle.getPutHandle({
              value: OPERATION_SHUTDOWN_VALUE,
              honeypotList: [records[ID_DATAINDEX]]
            }),
            title: `关闭蜜罐 ${records[HONEYPOT_NAME_DATAINDEX]}  后，将无法再感知威胁信息`
          })
        }

        if (key === "delete") {
          Modal.confirm({
            onOk: handle.getDelHandle({
              [ID_DATAINDEX]: records[ID_DATAINDEX]
            }),
            title: `删除蜜罐 ${records[HONEYPOT_NAME_DATAINDEX]}  后，将无法再恢复`
          })
        }

        if (key === "reload") {
          Modal.confirm({
            onOk: handle.getPutHandle({
              value: OPERATION_INIT_VALUE,
              honeypotList: [records[ID_DATAINDEX]]
            }),
            title: `还原蜜罐 ${records[HONEYPOT_NAME_DATAINDEX]}  初始镜像后，将无法返回蜜罐当前状态`
          })
        }
      }}>
        <Menu.Item key="start" disabled={isRunning || isLicenceOverdue || isNodeProductType}>
          <Icon type="login" />&nbsp;开机
        </Menu.Item>
        <Menu.Item key="poweroff" disabled={isStop || isLicenceOverdue || isNodeProductType}>
          <Icon type="poweroff" />&nbsp;关机
        </Menu.Item>
        <Menu.Item key="delete" disabled={isNodeProductType}>
          <Icon type="delete" />&nbsp; 删除蜜罐
        </Menu.Item>
        <Menu.Item key="reload" disabled={isLicenceOverdue || isNodeProductType}>
          <Icon type="reload" />&nbsp; 还原初始蜜罐
        </Menu.Item>
      </Menu>
    )

  return (
    <div style={{ textAlign: "center" }}>
      <Dropdown overlay={menu}>
        <Button icon="ellipsis" />
      </Dropdown>
    </div>
  )
}



const staticFilterOptions = {
  // [HONEYPOT_TYPE_ROW_KEY]: [
  //   ...systems,
  //   ...interactions
  // ],
  [HONEYPOT_STATUS_DATAINDEX]: [...honeypotStatusValues]
}

const filterTextConfig = {
  [HONEYPOT_TYPE_ROW_KEY]: {
    ...interactionsTextConfig,
    ...systemsTextConfig,
  },
  [HONEYPOT_STATUS_DATAINDEX]: honeypotStatusTextConfig
}


export const getColumns = ({
  isDark,
  isAdmin,
  productType,
  queryFilters,
  handle,
  filterTextConfigs = {},
  filterOptions = {},
                         }) => {

  const renderer = {
    [HONEYPOT_TYPE_ROW_KEY]: honeypotTypeRenderer,
    [SERVICES_DATAINDEX]: servicesRenderer,
    [PORTS_DATAINDEX]: portsRenderer,
    [HONEYPOT_STATUS_DATAINDEX]: honeypotStatusRenderer,
    [OPERATION_ROW_KEY]: getOperationRenderer(handle, productType),
    [HOST_IP_DATAINDEX]: commonRenderer,
    [HONEYPOT_IP_DATAINDEX]: commonRenderer,
    [HONEYPOT_NAME_DATAINDEX]: commonRenderer,
  }


  const columns = tableColumnsGenerator({
    keys: tableRowDataIndexes,
    renderer,
    titleTextConfig: tableTextConfig.colTitles,
    filterOptions: { ...staticFilterOptions, ...filterOptions },
    filterTextConfig: { ...filterTextConfig, ...filterTextConfigs },
    filteredValue: queryFilters,
    extraProps: {
      [HOST_IP_DATAINDEX]: {
        filterMultiple: false,
      },
      [HONEYPOT_IP_DATAINDEX]: {
        filterMultiple: false,
      }
    }
  });

  return isAdmin
    ?
    columns
    :
    [
      ...columns.slice(0, columns.length - 1),
    ]


};


