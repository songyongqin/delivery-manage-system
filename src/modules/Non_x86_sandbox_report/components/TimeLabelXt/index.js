import * as React from 'react'
import Tag from '../Tag/index'
import moment from 'moment'

export default ({ value }) => {
  return <Tag>{moment(value * 1000).format("YYYY-MM-DD HH:mm:ss")}</Tag>
}