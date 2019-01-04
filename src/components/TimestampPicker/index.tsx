import { DatePicker } from 'antd'
import * as React from 'react'
import moment from 'moment'

export default ({ defaultValue = [], onChange, disabled = false }) => {
  return (
    <DatePicker.RangePicker
      style={{ width: "100%" }}
      disabled={disabled}
      onChange={timestampRange => onChange && onChange({ timestampRange })}
      placeholder={["全部", "全部"]}
      allowClear={true}
      size="large"
      ranges={{
        "今天": [moment().subtract(0, "days"), moment().subtract(0, 'days')],
        "本周": [moment().startOf("week"), moment().subtract(0, 'days')],
        "本月": [moment().startOf('month'), moment().subtract(0, 'days')],
        "本季度": [moment().startOf('quarter'), moment().subtract(0, 'days')],
        "本年度": [moment().startOf("year"), moment().subtract(0, 'days')],
        "全部": []
      }}>
    </DatePicker.RangePicker>
  )
}