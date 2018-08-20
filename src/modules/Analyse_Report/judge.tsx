import * as React from 'react'
import { JUDGE_DATA_INDEX } from './ConstConfig'

export default ({ value }) => {
  return <div style={{ textAlign: "center" }}>{value == "1" ? "可疑" : value == "-1" ? "威胁" : value == "0" ? "未知" : null}</div>
}