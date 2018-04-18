
import * as React from 'react'
import TimesLabel from 'components/TimeLabel'

export const getColumns = (option) => {
  return [{
    title: '登录时间',
    dataIndex: 'time',
    key: 'time',
    render: value => {
      return <TimesLabel value={value}></TimesLabel>
    }
  },
  {
    title: '登录账号',
    dataIndex: 'userAccount',
  },
  {
    title: '登录IP',
    dataIndex: 'ip',
  },
  {
    title: '登录状态',
    dataIndex: 'loginStatus',
  }
  ]
}