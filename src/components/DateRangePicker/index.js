/**
 * Created by jojo on 2017/8/28.
 */
import {DatePicker} from 'antd';

import moment from 'moment';

const disabledDate=(current)=>{
  return current && (current.valueOf()-24*3600*1000) > Date.now();
};

export default ({loading,size="large",dateOnChange,defaultValue})=>{
  return (
    <DatePicker.RangePicker size="large"
                            style={{width:"100%"}}
                            disabled={loading}
                            onChange={dateOnChange}
                            allowClear={true}
                            disabledDate={disabledDate}
                            defaultValue={defaultValue}
                            renderExtraFooter={()=>{
                              return <span style={{fontSize:"14px"}}>*日期范围为空则表示获取全部</span>
                            }}
                            ranges={{
                              "今天": [moment().subtract(0,"days"),moment().subtract(-1, 'days')],
                              "最近一个月":[moment().subtract(30, 'days'),moment().subtract(-1,'days')],
                              "全部": []
                            }}
                            />
  )
}
