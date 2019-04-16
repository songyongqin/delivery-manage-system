import * as React from 'react'
// import { REPORT_URL } from 'configs/RouteConfig'
import domainQueryStringParse from 'utils/domainQueryStringParse'

// xx
// import { TASK_ID_DATA_INDEX } from 'configs/ConstConfig'

import { ANALYSE_REPORT_DETAIL_URL } from 'routes/config/path'

// const REPORT_URL = "/report" 
const TASK_ID_DATA_INDEX = "taskId"

//将taskId修改为md5

export default ({ data }) => {
  // console.log(data['md5'])
  // const payload = {
  //   [TASK_ID_DATA_INDEX]: data[TASK_ID_DATA_INDEX]
  // }
  const payload = {
    md5: data['md5']
  }

  return <a href={'/#'+ANALYSE_REPORT_DETAIL_URL + domainQueryStringParse(payload)} style={{  textDecoration: "underline" }}  target="_blank">查看</a>
}

