import * as React from 'react'
// import { REPORT_URL } from 'configs/RouteConfig'
import domainQueryStringParse from 'utils/domainQueryStringParse'

// xx
// import { TASK_ID_DATA_INDEX } from 'configs/ConstConfig'

import { ANALYSE_REPORT_DETAIL_URL } from 'routes/config/path'

// const REPORT_URL = "/report" 
const TASK_ID_DATA_INDEX = "taskId"

export default ({ data }) => {
  
  const payload = {
    [TASK_ID_DATA_INDEX]: data[TASK_ID_DATA_INDEX]
  }

  return <a href={'/#'+ANALYSE_REPORT_DETAIL_URL + domainQueryStringParse(payload)} target="_blank">查看报告</a>
}

