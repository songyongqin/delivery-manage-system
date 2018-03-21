import * as React from 'react'
import Tag from 'components/Tag'
import moment from 'moment'

export default ({ value }) => {
  return <Tag color="#1890ff">{moment(value * 1000).format("YYYY-MM-DD HH:mm:ss")}</Tag>
}