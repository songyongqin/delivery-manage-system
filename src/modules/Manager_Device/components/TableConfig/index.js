/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import tableColumnsGenerator from '../../../../utils/tableColumnsGenerator';
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
} from '../../ConstConfig';
import { Progress, Row, Col, Badge, Button, Dropdown, Icon, Menu } from 'antd'
import JoTag from '../../../../components/JoTag';
import TimesLabel from '../../../../components/TimesLabel';
import styles from './styles.css';
import moment from 'moment';
import classnames from 'classnames';
import * as tools from '../../../../utils/tools';
import SliderForm from '../SliderForm';

const diskPerRenderer = value => {
  return <div style={{ textAlign: "center" }}>
    <Progress type="dashboard"
      percent={value}
      width={80} />
  </div>
}

const devicePropsRender = value => {
  return <div style={{ textAlign: "center" }}>
    <JoTag color="#108ee9">{devicePropsTextConfig[value]}</JoTag>
  </div>
}


const tagRenderer = value => {
  return <div style={{ textAlign: "center" }}>
    <JoTag color="#108ee9">{value}</JoTag>
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

const getLiencenRenderer = isDark => value => (
  <div style={{ textAlign: "center" }} >
    {licenceValueRenderer(value[LICENCE_STATUS_VALUE_DATAINDEX], isDark)}
    <br /><br />
    {
      value[LICENCE_STATUS_VALUE_DATAINDEX] !== LICENCE_NULL_VALUE
        ?
        <span>授权到期时间:&nbsp;</span>
        :
        null
    }
    {
      value[LICENCE_STATUS_VALUE_DATAINDEX] !== LICENCE_NULL_VALUE
        ?
        <JoTag color="#108ee9">
          {getTimeFormat(value[LICENCE_STATUS_EXPIRATION_DATAINDEX])}
        </JoTag>
        :
        null
    }
  </div>
)

const getOperationRenderer = ({ isAdmin, isNode, handle }) => {
  return records => {
    const isLicence = records[LICENCE_STATUS_DATAINDEX][LICENCE_STATUS_VALUE_DATAINDEX] === LICENCE_VALID_VALUE,
      isConnect = isNode ? records[CONNECT_STATUS_DATAINDEX] === CONNECT : true,
      menu = (
        <Menu onClick={({ key }) => {
          if (key === "licence") {
            handle.licenceHandle();
          }

        }}>
          <Menu.Item key="licence" disabled={isLicence || !isAdmin || !isConnect}>
            <Icon type="unlock" />&nbsp;授权
          </Menu.Item>
          <Menu.Item disabled={(!isAdmin || !isConnect) && isNode}>
            <span>
              <Icon type="reload" />&nbsp;检查升级
                </span>
          </Menu.Item>
          <Menu.Item disabled={!isAdmin || !isConnect}>
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

const getVersionListRenderer = dataIndex => value => {
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
                <JoTag color="#108ee9"
                  style={{ marginBottom: "0" }}>
                  {i[VERSION_DATAINDEX]}
                </JoTag>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export const getColumns = ({ isDark, isAdmin, handle, isNode = true, queryFilters = {}, onSubmit }) => {

  const renderer = {
    diskPer: diskPerRenderer,
    hostIp: tagRenderer,
    deviceProps: devicePropsRender,
    applicationVersion: tagRenderer,
    libraryVersion: tagRenderer,
    licenceStatus: getLiencenRenderer(isDark),
    [CONNECT_STATUS_DATAINDEX]: value => (
      <div style={{ textAlign: "center" }}>
        {
          value === CONNECT
            ?
            <Badge className={isDark ? "lbl-dark" : null}
              status="success"
              text={tools.getKeyText(value, connectTextConfig)} />
            :
            <Badge className={isDark ? "lbl-dark" : null}
              status="error"
              text={tools.getKeyText(value, connectTextConfig)} />
        }
      </div>
    ),
    [LIBRARY_VERSION_LIST_DATAINDEX]: getVersionListRenderer(LIBRARY_VERSION_LIST_DATAINDEX),
    [ENGINE_VERSION_LIST_DATAINDEX]: getVersionListRenderer(ENGINE_VERSION_LIST_DATAINDEX)
  }


  const finalTitleTextConfig = {};

  Object.entries(tableTextConfig.colTitles).forEach(i => {

    if (i[0] === DISK_PER_DATAINDEX && isNode) {
      finalTitleTextConfig[i[0]] = (
        <p style={{ textAlign: "center", display: "inline-block", width: "60%" }}>
          {i[1]}
        </p>
      )
    } else {
      finalTitleTextConfig[i[0]] = (
        <p style={{ textAlign: "center" }}>
          {i[1]}
        </p>
      )
    }


  })


  const extraProps =
    isNode
      ?
      {
        [DISK_PER_DATAINDEX]: {
          filterIcon: <Icon type="filter"
            style={{
              color: "#108ee9",
            }} />,
          filterDropdown: <SliderForm defaultValue={queryFilters}
            onSubmit={onSubmit} />
        }
      }
      :
      {}


  let columns = tableColumnsGenerator({
    keys: deviceRowDataIndexes,
    titleTextConfig: finalTitleTextConfig,
    renderer,
    extraProps
  });

  const CONNCET_ROW_INDEX = 4

  columns = isNode
    ?
    columns
    :
    [
      ...columns.slice(0, CONNCET_ROW_INDEX),
      ...columns.slice(CONNCET_ROW_INDEX + 1)
    ]


  return isAdmin
    ?
    [
      ...columns,
      {
        title: <p style={{ textAlign: "center" }}>
          {tableTextConfig.colTitles[OPERATION_ROW_KEY]}
        </p>,
        key: OPERATION_ROW_KEY,
        render: getOperationRenderer({ isAdmin, handle, isNode })
      }
    ]
    :
    columns

};


