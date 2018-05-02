import * as React from 'react'
import Tag from 'components/Tag'
import moment from 'moment'

export default ({ value }) => {
  try {
    if (value.length === 1) {
      return <Tag color="#1890ff">{moment(value * 1000).format("YYYY-MM-DD HH:mm:ss")}</Tag>
    }
    return [
      <Tag color="#1890ff" key="nth-1">{moment(value[0] * 1000).format("YYYY-MM-DD HH:mm:ss")}</Tag>,
      <span key="txt">至&nbsp;</span>,
      <Tag color="#1890ff" key="nth-2">{moment(value[1] * 1000).format("YYYY-MM-DD HH:mm:ss")}</Tag>,
    ]
  } catch (e) {
    return <Tag color="#1890ff">{moment(value * 1000).format("YYYY-MM-DD HH:mm:ss")}</Tag>
  }
}