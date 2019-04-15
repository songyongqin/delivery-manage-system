import { DatePicker } from 'antd'
import * as React from 'react'
import moment from 'moment'
import { Calendar } from 'components/IconSvg'
const styles = require('./index.less')

export default ({ defaultValue = [], onChange, disabled = false }) => {
  return (
    <div className={ styles.time } >
      <DatePicker.RangePicker
        style={{ width: "100%" }}
        disabled={disabled}
        defaultValue= { defaultValue }
        onChange={timestampRange => onChange && onChange({ timestampRange })}
        placeholder={["今天", "今天"]}
        suffixIcon={ <Calendar style={{ color: '#4F5DCA', verticalAlign: 'text-top', width:18 }} /> }
        allowClear={true}
        size="large"
        ranges={{
          // "今天": [moment().subtract(0, "days"), moment().subtract(0, 'days')],
          // "本周": [moment().startOf("week"), moment().subtract(0, 'days')],
          // "本月": [moment().startOf('month'), moment().subtract(0, 'days')],
          // "本季度": [moment().startOf('quarter'), moment().subtract(0, 'days')],
          // "本年度": [moment().startOf("year"), moment().subtract(0, 'days')],
          // "全部": []
          "今天": [moment().subtract(0, "days"), moment().subtract(0, 'days')],
          "过去7天": [moment().subtract(6, "days"), moment().subtract(0, 'days')],
          "过去14天": [moment().subtract(13, "days"), moment().subtract(0, 'days')],
          "过去30天": [moment().subtract(29, "days"), moment().subtract(0, 'days')],
          "过去三个月": [moment().subtract(89, "days"), moment().subtract(0, 'days')]
        }}>
      </DatePicker.RangePicker>
    </div>
  )
}