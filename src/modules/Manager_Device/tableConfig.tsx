import * as  React from 'react'
import {
  deviceRowDataIndexes,
  tableTextConfig,
  devicePropsTextConfig,
  licenceValueTextConfig,
  LICENCE_STATUS_VALUE_DATAINDEX,
  LICENCE_STATUS_EXPIRATION_DATAINDEX,
  LICENCE_OVERDUE_VALUE,
  LICENCE_NULL_VALUE,
  LICENCE_STATUS_DATAINDEX,
  OPERATION_ROW_KEY,
  LICENCE_VALID_VALUE,
  CONNECT_STATUS_DATAINDEX,
  LIBRARY_VERSION_LIST_DATAINDEX,
  connectTextConfig,
  CONNECT,
  ENGINE_VERSION_LIST_DATAINDEX,
  VERSION_DATAINDEX,
  NAME_DATAINDEX,
  DISK_PER_DATAINDEX,
  ID_DATAINDEX,
  CODE_DATAINDEX,
  APPLIACTION_VERSION_DATAINDEX,
  VERSION_COMBINE_KEY,
} from './constants'
import { Progress, Row, Col, Badge, Button, Dropdown, Icon, Menu, Popover } from 'antd'
import Tag from 'components/Tag'
import TimesLabel from 'components/TimeLabel'
import styles from './styles.css'
import moment from 'moment'
import classnames from 'classnames'
import * as tools from 'utils'
import columnsCreator from 'domainUtils/columnsCreator'

const ALLOW_AHEAD_LICENCE_DAY = 15

const diskPerRenderer = value => {
  return <div style={{ textAlign: "center" }}>
    <Progress type="dashboard"
      percent={value}
      width={80} />
  </div>
}

const devicePropsRender = value => {
  return <div style={{ textAlign: "center" }}>
    <Tag color="#108ee9">{devicePropsTextConfig[value]}</Tag>
  </div>
}


const tagRenderer = value => {
  return <div style={{ textAlign: "center" }}>
    <Tag color="#108ee9" style={{ marginBottom: "0" }}>{value}</Tag>
  </div>
}

const licenceValueRenderer = (value, isDark) => {
  if (value === LICENCE_VALID_VALUE) {
    return <Badge className={isDark ? "lbl-dark" : null}
      status="success"
      text={licenceValueTextConfig[value]} />
  }
  return <Badge className={isDark ? "lbl-dark" : null}
    status="error"
    text={licenceValueTextConfig[value]} />
}

const getTimeFormat = time => moment(time * 1000).format("YYYY-MM-DD");

const getLicenceRenderer = isDark => value => (
  <div style={{ textAlign: "center" }} >
    {licenceValueRenderer(value[LICENCE_STATUS_VALUE_DATAINDEX], isDark)}
    {
      value[LICENCE_STATUS_VALUE_DATAINDEX] !== LICENCE_NULL_VALUE
        ?
        <div style={{ marginTop: "5px" }}>
          <span>授权到期时间:&nbsp;</span>
          <Tag color="#108ee9">
            {getTimeFormat(value[LICENCE_STATUS_EXPIRATION_DATAINDEX])}
          </Tag>
        </div>
        :
        null

    }
  </div>
)


const getOperationRenderer = ({ handle, readonly = false }) => {
  return records => {
    let licence = records[LICENCE_STATUS_DATAINDEX][LICENCE_STATUS_VALUE_DATAINDEX] === LICENCE_VALID_VALUE,
      connect = records[CONNECT_STATUS_DATAINDEX] === CONNECT,
      // isNodeProductType = productType.type === NODE,
      // isIdsProductType = productType.type === IDS,
      licenceExpiration = records[LICENCE_STATUS_DATAINDEX][LICENCE_STATUS_EXPIRATION_DATAINDEX],
      canAheadLicence = (licenceExpiration - new Date().getTime() / 1000) <= ALLOW_AHEAD_LICENCE_DAY * 3600

    const menu = (
      <Menu onClick={({ key }) => {
        const payload = [records]
        handle[key] && handle[key](payload)
      }}>
        <Menu.Item key="licence" disabled={readonly || !connect}>
          <Icon type="unlock" />&nbsp;授权
          </Menu.Item>
        <Menu.Item key="update" disabled={readonly || (!licence) || (!connect)}>
          <span>
            <Icon type="reload" />&nbsp;检查升级
          </span>
        </Menu.Item>
        <Menu.Item key="clean" disabled={readonly || !connect}>
          <span>
            <Icon type="delete" />&nbsp;磁盘清理
          </span>
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
}

const getVersionListRenderer = () => value => {
  value = value || [];
  return (
    <table className={styles["version-table"]}>
      <tbody>
        {
          value.map((i, index) => (
            <tr key={`${index}-row`}>
              <td>
                {i[NAME_DATAINDEX]}
              </td>
              <td>
                <Tag color="#108ee9"
                  style={{ marginBottom: "0" }}>
                  {i[VERSION_DATAINDEX]}
                </Tag>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

const commonVersionCellStyle = { borderLeft: "1px solid #cccccc", borderRight: "1px solid #cccccc" }

const versionListTableRenderer = records => {
  return (
    <table className={styles["version-list"]} style={{ width: "100%" }}>
      <tbody>
        <tr>
          <th>
            {tableTextConfig.colTitles[APPLIACTION_VERSION_DATAINDEX]}
          </th>
          <th>
            {tableTextConfig.colTitles[LIBRARY_VERSION_LIST_DATAINDEX]}
          </th>
          <th>
            {tableTextConfig.colTitles[ENGINE_VERSION_LIST_DATAINDEX]}
          </th>
        </tr>
        <tr>
          <td>
            <Tag color="#108ee9">{records[APPLIACTION_VERSION_DATAINDEX]}</Tag>
          </td>
          <td style={commonVersionCellStyle}>
            {getVersionListRenderer()(records[LIBRARY_VERSION_LIST_DATAINDEX])}
          </td>
          <td>
            {getVersionListRenderer()(records[ENGINE_VERSION_LIST_DATAINDEX])}
          </td>
        </tr>
      </tbody>
    </table>
  )
}



const versionListRenderer = records => {

  return (
    <p style={{ textAlign: "center" }}>
      <Popover
        title="版本信息"
        placement="left"
        content={<div style={{ width: "700px" }}>
          {versionListTableRenderer(records)}
        </div>}>
        <a style={{ padding: "5px" }}>
          <Icon type="eye-o"></Icon>
        </a>
      </Popover>
    </p>
  )
}


const versionDataIndexes = [APPLIACTION_VERSION_DATAINDEX, LIBRARY_VERSION_LIST_DATAINDEX, ENGINE_VERSION_LIST_DATAINDEX]


const renderer = {
  diskPer: diskPerRenderer,
  hostIp: tagRenderer,
  deviceProps: devicePropsRender,
  applicationVersion: tagRenderer,
  libraryVersion: tagRenderer,
  licenceStatus: getLicenceRenderer(false),
  [CONNECT_STATUS_DATAINDEX]: value => (
    <div style={{ textAlign: "center" }}>
      {
        value === CONNECT
          ?
          <Badge className={false ? "lbl-dark" : null}
            status="success"
            text={`${tools.getKeyText(value, connectTextConfig)}`} />
          :
          <Badge className={false ? "lbl-dark" : null}
            status="error"
            text={`${tools.getKeyText(value, connectTextConfig)}`} />
      }
    </div>
  ),
  [LIBRARY_VERSION_LIST_DATAINDEX]: getVersionListRenderer(),
  [ENGINE_VERSION_LIST_DATAINDEX]: getVersionListRenderer(),
  [VERSION_COMBINE_KEY]: (value, records) => {
    return versionListRenderer(records)
  }
}

export const getColumns = ({
  handle = {},
  versionColExpanded = true,
  readonly = false
}) => {


  const finalTitleTextConfig = {};

  Object.entries(tableTextConfig.colTitles).forEach(i => {

    finalTitleTextConfig[i[0]] = (
      <p style={{ textAlign: "center" }}>
        {i[1]}
      </p>
    )
  })




  const tableDataIndexes = versionColExpanded
    ?
    deviceRowDataIndexes
    :
    [...deviceRowDataIndexes.filter(i => !versionDataIndexes.includes(i)), VERSION_COMBINE_KEY]


  let columns = columnsCreator({
    dataIndexes: tableDataIndexes,
    titleConfig: tableTextConfig.colTitles,
    renderer,
  })


  // columns = isNode
  //   ?
  //   columns
  //   :
  //   columns.filter(i => i.dataIndex !== CONNECT_STATUS_DATAINDEX)


  return [
    ...columns,
    {
      title: <p style={{ textAlign: "center" }}>
        {tableTextConfig.colTitles[OPERATION_ROW_KEY]}
      </p>,
      key: OPERATION_ROW_KEY,
      render: getOperationRenderer({ handle, readonly })
    }
  ]

}

