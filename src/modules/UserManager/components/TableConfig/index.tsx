/**
 * Created by jojo on 2017/9/5.
 */
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

// import FilterDropdownWrapper from 'domainComponents/FilterDropdownWrapper'
// import SearchFilterForm from 'domainComponents/SearchFilterForm'

const tipTextConfig = {
  [ADMIN_ROLE]: "管理员唯一且拥有最高权限",
  [COMMON_USER_ROLE]: "普通用户仅具有查看威胁权限，无管理权限"
}

const roleRenderer = value => (
  <Tooltip title={tipTextConfig[value]}>
    <Tag >{tableTextConfig.enums.role[value]}</Tag>
  </Tooltip>
)


const freezeRenderer = value => {
  if (value === IS_FREEZE) {
    return <Tag color="blue">{tableTextConfig.enums.freeze[value]}</Tag>
  }
  if (value === IS_NOT_FREEZE) {
    return <Tag color="green">{tableTextConfig.enums.freeze[value]}</Tag>
  }
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


      // const menu = (
      //   <Menu>

      //     <Menu.Item disabled={records.freeze === IS_NOT_FREEZE}>
      //       <p onClick={records.freeze === IS_NOT_FREEZE
      //         ?
      //         null
      //         :
      //         handle.freeze(freezePayload)}>
      //         <Icon type="unlock" />
      //         &nbsp;
      //         {tableTextConfig.operation.freeze}
      //       </p>
      //     </Menu.Item>

      //     <Menu.Item >
      //       <p onClick={handle.limit(records)}>
      //         <Icon type="edit" />
      //         &nbsp;
      //         {tableTextConfig.operation.limit}
      //       </p>
      //     </Menu.Item>

      //     <Menu.Item >
      //       <p onClick={() => {
      //         Modal.confirm({
      //           title: `用户 ${records[USERACCOUNT_DATAINDEX]} 信息将被删除，不可恢复`,
      //           onOk: handle.getDelUserHandle(records[USERACCOUNT_DATAINDEX])
      //         })
      //       }}>
      //         <Icon type="delete" />
      //         &nbsp;
      //         {tableTextConfig.operation.delete}
      //       </p>
      //     </Menu.Item>

      //     <Menu.Item >
      //       <p onClick={handle.getPatchUserHandle(records[USERACCOUNT_DATAINDEX])}>
      //         <Icon type="reload" />
      //         &nbsp;
      //         {tableTextConfig.operation.reset}
      //       </p>
      //     </Menu.Item>
      //   </Menu>
      // )


      return (
        <div>
          {/* <Dropdown overlay={menu}>
            <Button icon="ellipsis" />
          </Dropdown> */}
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
    extraProps: {
      // ...getFilterForm({
      //   dataIndexes: filterDataIndexes,
      //   textConfig: filterFormTextConfig,
      //   onQuery,
      //   queryFilters,
      //   ruleConfig
      // })
      // [USERACCOUNT_DATAINDEX]: {
      //   filterIcon: <Icon type="filter" style={{ color: "#108ee9" }} />,
      //   filterDropdown: <FilterDropdownWrapper style={{ width: "320px" }}>
      //     <SearchFilterForm
      //       config={{
      //         dataIndex: USERACCOUNT_DATAINDEX,
      //         placeholder: "请输入用户账号",
      //         label: "用户账号搜索"
      //       }}
      //       defaultValue={queryFilters}
      //       onSubmit={onQuery}>
      //     </SearchFilterForm>
      //   </FilterDropdownWrapper>
      // },
      // [USER_NAME_DATAINDEX]: {
      //   filterIcon: <Icon type="filter" style={{ color: "#108ee9" }} />,
      //   filterDropdown: <FilterDropdownWrapper style={{ width: "320px" }}>
      //     <SearchFilterForm
      //       config={{
      //         dataIndex: USER_NAME_DATAINDEX,
      //         placeholder: "请输入用名",
      //         label: "用户名搜索"
      //       }}
      //       defaultValue={queryFilters}
      //       onSubmit={onQuery}>
      //     </SearchFilterForm>
      //   </FilterDropdownWrapper>
      // }
    }
  });

  return [
    ...columns,
    getOperationColumn({ handle })
  ]

};


