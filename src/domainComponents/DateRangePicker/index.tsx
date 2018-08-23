import { DatePicker } from 'antd'
import * as React from 'react'
import moment from 'moment'

const disabledDate = (current) => {
  return current && (current.valueOf()) > Date.now()
}

export default class DateRangePicker extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }
  onChange = (timestampRange) => {
    const { onChange } = this.props
    onChange && onChange({ timestampRange })
  }
  render() {
    const { loading, onChange, value } = this.props
    return (
      <DatePicker.RangePicker
        style={{ width: "300px" }}
        disabled={loading}
        onChange={this.onChange}
        allowClear={true}
        value={value}
        disabledDate={disabledDate}
        placeholder={["全部", "全部"]}
        ranges={{
          "今天": [moment().subtract(0, "days"), moment().subtract(0, 'days')],
          "本周": [moment().startOf("week"), moment().subtract(0, 'days')],
          "本月": [moment().startOf('month'), moment().subtract(0, 'days')],
          "本季度": [moment().startOf('quarter'), moment().subtract(0, 'days')],
          "本年度": [moment().startOf("year"), moment().subtract(0, 'days')],
          "全部": []
        }} />
    )
  }
}
