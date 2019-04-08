import * as React from 'react'
import Tag from 'components/Tag'
import { Icon, Switch, Card, Timeline, InputNumber, Button, Menu, Dropdown, Tooltip, Modal } from 'antd'
import classnames from 'classnames'
import * as tools from 'utils/tools'
import columnsCreator from 'domainUtils/columnsCreator'
import {
  rowDataIndexes,
  tableTextConfig,
  OPERATION_ROW_KEY,
  ROLE_DATAINDEX,
  USERACCOUNT_DATAINDEX,
  USER_NAME_DATAINDEX,
  FREEZE_DATAINDEX,
  ADMIN_ROLE,
  COMMON_USER_ROLE,
  IS_NOT_FREEZE,
  IS_FREEZE,
} from '../../constants'


const tipTextConfig = {
  [ADMIN_ROLE]: "管理员唯一且拥有最高权限",
  [COMMON_USER_ROLE]: "普通用户仅具有查看威胁权限，无管理权限"
}

const roleRenderer = value => (
  <Tooltip title={tipTextConfig[value]}>
    {/* <Tag >{tableTextConfig.enums.role[value]}</Tag> */}
    <div>{tableTextConfig.enums.role[value]}</div>
  </Tooltip>
)


const freezeRenderer = value => {
  // if (value === IS_FREEZE) {
  //   return <Tag color="blue">{tableTextConfig.enums.freeze[value]}</Tag>
  // }
  // if (value === IS_NOT_FREEZE) {
  //   return <Tag color="green">{tableTextConfig.enums.freeze[value]}</Tag>
  // }
  
  return <div style={{ color: `${ value === IS_FREEZE ? 'red': 'green' }` }} >{tableTextConfig.enums.freeze[value]}</div>
}

const getOperationColumn = ({ handle = {} } = {}) => {
  return {
    title: tableTextConfig.rowTitles[OPERATION_ROW_KEY],
    key: OPERATION_ROW_KEY,
    render: records => {
      if (records.role === ADMIN_ROLE) {
        return
      }

      const freezePayload = {
        userAccount: records.userAccount,
        freeze: IS_NOT_FREEZE
      }

      const menu = (
        <Menu onClick={({ key }) => {
          handle[key] && handle[key](records)
        }}>
          <Menu.Item key="freeze" disabled={records.freeze === IS_NOT_FREEZE}>
            <Icon type="unlock" />
            &nbsp;解除该用户冻结
          </Menu.Item>
          <Menu.Item key="edit">
            <Icon type="edit" />
            &nbsp;编辑
          </Menu.Item>
          <Menu.Item key="delete">
            <Icon type="delete" />
            &nbsp;删除
          </Menu.Item>
          <Menu.Item key="reset">
            <Icon type="reload" />
            &nbsp;重置密码
          </Menu.Item>
        </Menu>
      )


      return (
        <div>
          <Dropdown overlay={menu}>
            <Button icon="ellipsis" />
          </Dropdown>
        </div>
      )
    }
  }
}

// import getFilterForm from 'utils/getFilterForm'

const filterDataIndexes = [
  USERACCOUNT_DATAINDEX,
  USER_NAME_DATAINDEX
]


const filterFormTextConfig = {
  [USERACCOUNT_DATAINDEX]: {
    placeholder: "请输入用户账号",
    label: "用户账号搜索"
  },
  [USER_NAME_DATAINDEX]: {
    label: "用户名搜搜",
    placeholder: "请输入用户名"
  },
}

const ruleConfig = {

}

export const getColumns = ({ handle = {} } = {}) => {

  const columns = columnsCreator({
    dataIndexes: rowDataIndexes,
    titleConfig: tableTextConfig.rowTitles,
    renderer: {
      [ROLE_DATAINDEX]: roleRenderer,
      [FREEZE_DATAINDEX]: freezeRenderer,
    },
  })
  return [
    ...columns,
    getOperationColumn({ handle })
  ]

};


