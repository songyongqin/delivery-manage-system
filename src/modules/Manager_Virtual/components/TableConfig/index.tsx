/**
 * Created by jojo on 2017/9/5.
 */
import * as React from 'react'
import columnsCreator from 'domainUtils/columnsCreator'
import styles from './styles.css'
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
} from '../../constants'

// import {
//   INDUSTRIAL_CONTROL_SERVICE,
//   systemsTextConfig,
//   interactionsTextConfig,
//   servicesTextConfig,
//   systems,
//   interactions,
// } from 'configs/ConstConfig';

import { Progress, Row, Col, Badge, Button, Popover, Tooltip, Menu, Dropdown, Icon, Popconfirm, Modal } from 'antd'
import Tag from 'components/Tag'
import classnames from 'classnames'
import * as tools from 'utils'
// import getFilterIcon from 'utils/getFilterIcon'


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
        <Tag key="overflow" style={{ cursor: "pointer" }}>更多内容...</Tag>
      </Popover>
      :
      null

  return <div style={style} className={className}>
    {
      layout === X_LAYOUT
        ?
        [
          ...outerTags.map((i, index) => (
            <Tag key={i} color={color[index % colorCount]}>
              {i}
            </Tag>
          )),
          extraTag,
        ]
        :
        [
          outerTags.map((i, index) => [
            <Tag key={i} color={color[index % colorCount]}>
              {i}
            </Tag>,
            <br key={`${i}-br`} />
          ]),
          extraTag,
        ]

    }
  </div>

}


const commonRenderer = value => <div style={{ textAlign: "center" }}>{value}</div>

const honeypotTypeRenderer = (value, records) => {

  const system = records[SYSTEM_DATAINDEX],
    interactions = records[INTERCATION_DATAINDEX],
    services = records[SERVICES_DATAINDEX];

  let data = [
    system,
    interactions
  ]

  // services.includes(INDUSTRIAL_CONTROL_SERVICE)
  //   &&
  //   data.push(tools.getKeyText(INDUSTRIAL_CONTROL_SERVICE, servicesTextConfig))

  return <TagList data={data}
    color={["#108ee9"]}
    style={{ textAlign: "center" }} />
}

const servicesRenderer = value => (
  <TagList style={{ textAlign: "center" }}
    color={["#108ee9"]}
    data={value} />
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

const getOperationRenderer = (handle = {}) => (value, records) => {
  let status = records[HONEYPOT_STATUS_DATAINDEX]
  const isLicenceOverdue = status.includes(STATUS_LICENCE_OVERDUE),
    isRunning = (status.includes(STATUS_RUNNING_VALUE)),
    isStop = (status.includes(STATUS_STOP_VALUE)),
    // isNodeProductType = productType === NODE,
    menu = (
      <Menu onClick={({ key }) => {
        handle && handle[key] && handle[key](records)
      }}>
        <Menu.Item key="login" >
          <Icon type="login" />&nbsp;开机
        </Menu.Item>
        <Menu.Item key="logout" >
          <Icon type="poweroff" />&nbsp;关机
        </Menu.Item>
        <Menu.Item key="delete" >
          <Icon type="delete" />&nbsp; 删除蜜罐
        </Menu.Item>
        <Menu.Item key="reload" >
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
    // ...interactionsTextConfig,
    // ...systemsTextConfig,
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
  setActiveFilter
}) => {

  const renderer = {
    [HONEYPOT_TYPE_ROW_KEY]: honeypotTypeRenderer,
    [SERVICES_DATAINDEX]: servicesRenderer,
    [PORTS_DATAINDEX]: portsRenderer,
    [HONEYPOT_STATUS_DATAINDEX]: honeypotStatusRenderer,
    [OPERATION_ROW_KEY]: getOperationRenderer(handle),
    [HOST_IP_DATAINDEX]: commonRenderer,
    [HONEYPOT_IP_DATAINDEX]: commonRenderer,
    [HONEYPOT_NAME_DATAINDEX]: commonRenderer,
  }

  const columns = columnsCreator({
    dataIndexes: tableRowDataIndexes,
    renderer,
    titleConfig: Object.entries(tableTextConfig.colTitles)
      .reduce((target, [dataIndex, title]) => {
        target[dataIndex] = <div style={{ textAlign: "center" }}>{title}</div>
        return target
      }, {}),
    // filterOptions: { ...staticFilterOptions, ...filterOptions },
    // filterTextConfig: { ...filterTextConfig, ...filterTextConfigs },
    // filteredValue: queryFilters,
    // extraProps: {
    //   ...tableRowDataIndexes.reduce((finalExtraProps, dataIndex) => {

    //     finalExtraProps[dataIndex] = {
    //       filterMultiple: ![HOST_IP_DATAINDEX, HONEYPOT_IP_DATAINDEX].includes(dataIndex),
    //       onFilterDropdownVisibleChange: visible => {
    //         visible && setActiveFilter && setActiveFilter(dataIndex)
    //       },
    //       // filterIcon: getFilterIcon(queryFilters[dataIndex])
    //     }

    //     return finalExtraProps
    //   }, {})
    // }
  })

  return columns
  // return isAdmin
  //   ?
  //   columns
  //   :
  //   [
  //     ...columns.slice(0, columns.length - 1),
  //   ]


};


