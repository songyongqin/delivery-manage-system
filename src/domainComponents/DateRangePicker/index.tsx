import { DatePicker } from 'antd'
import * as React from 'react'
import moment from 'moment'
import { Calendar } from 'components/IconSvg'
import { LAYOUT_NAMESPACE } from 'constants/model'
import { getOtherSenconds } from 'utils/getInitTime'
import extraConnect from 'domainUtils/extraConnect'
const disabledDate = (current) => {
  return current && (current.valueOf()) > Date.now()
}

// const getDayNum = num => num*24*60*60

// const getOtherSenconds = num => moment().second( -getDayNum(num))
@extraConnect()
export default class DateRangePicker extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }
  onChange = (timestampRange) => {
    const { onChange } = this.props
    if(this.props.global){
      this.props.dispatch({ type: `${LAYOUT_NAMESPACE}/changeSelectTime`, payload: timestampRange })
    }
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
        suffixIcon={ <Calendar style={{ color: '#4F5DCA', verticalAlign: 'text-top', width:18 }} /> }
        disabledDate={disabledDate}
        placeholder={["今天", "今天"]}
        ranges={{
          // "今天": [moment().subtract(0, "days"), moment().subtract(0, 'days')],
          // "本周": [moment().startOf("week"), moment().subtract(0, 'days')],
          // "本月": [moment().startOf('month'), moment().subtract(0, 'days')],
          // "本季度": [moment().startOf('quarter'), moment().subtract(0, 'days')],
          // "本年度": [moment().startOf("year"), moment().subtract(0, 'days')],
          // "全部": []
          // "今天": [getOtherSenconds(1), getOtherSenconds(0)],
          // "过去7天": [getOtherSenconds(7), getOtherSenconds(0)],
          // "过去14天": [getOtherSenconds(14), getOtherSenconds(0)],
          // "过去30天": [getOtherSenconds(30), getOtherSenconds(0)],
          // "过去三个月": [getOtherSenconds(90), getOtherSenconds(0)]
          "今天": [moment().subtract(0, "days"), moment().subtract(0, 'days')],
          "过去7天": [moment().subtract(6, "days"), moment().subtract(0, 'days')],
          "过去14天": [moment().subtract(13, "days"), moment().subtract(0, 'days')],
          "过去30天": [moment().subtract(29, "days"), moment().subtract(0, 'days')],
          "过去三个月": [moment().subtract(89, "days"), moment().subtract(0, 'days')],
          // "全部": [moment(0),moment().subtract(0, 'days')]
        }} />
    )
  }
}
