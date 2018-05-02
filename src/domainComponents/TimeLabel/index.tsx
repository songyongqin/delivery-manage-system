import * as React from 'react'
import moment from 'moment'
import Tag from 'components/Tag'
import { primaryColor } from 'themes/vars'
const getTimeFormat = time => moment(time * 1000).format("YYYY-MM-DD HH:mm")

const TimeLabel = ({ times, value }: any) => {
  try {
    //适配旧的API value的值迁移到 times
    if (value !== null && value !== undefined) {
      times = value
    }
    if (!Array.isArray(times)) {
      times = [times]
    }

    if (times.length === 1) {
      return <Tag color={primaryColor}>{getTimeFormat(times[0])}</Tag>
    }
    if (times.length >= 2) {
      return (
        <div style={{ display: "inline-block" }}>
          <Tag color={primaryColor}>{getTimeFormat(times[0])}</Tag>
          &nbsp;至&nbsp;&nbsp;
        <Tag color={primaryColor}>{getTimeFormat(times[1])}</Tag>
        </div>
      )
    }
    return null
  } catch (e) {
    console.error(e)
    return null
  }
}

export default TimeLabel