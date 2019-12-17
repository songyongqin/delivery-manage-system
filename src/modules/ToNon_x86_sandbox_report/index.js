// import * as React from 'react'
// import * as tools from '../../utils/tools'
// import { Button } from 'antd'

// export default ({ md5, x86_analysis_status }) => {


//   const payload = {
//     md5: md5
//   }

//   return <Button loading={!x86_analysis_status} size="small" style={{ background: "#4c4f53", color: "#fff" }}>
//   {
//     x86_analysis_status
//       ?
//       <a style={{ color: "#fff" }} target="_blank" href={"/#/api/query/sample_non_x86_sandbox_report" + tools.jsonToQueryString(payload)}>非X86沙箱报告链接</a>
//       :
//       "报告生成中..."
//   }
// </Button>
//   return <a style={{ display:"block",marginTop:20 ,color: "#0000FF",textDecoration:"underline",fontSize: 14, fontWeight: 400}} target="_blank" href={"/#/api/query/sample_non_x86_sandbox_report" + tools.jsonToQueryString(payload)}>非X86沙箱报告链接</a>

// }


import * as React from 'react'
import * as tools from '../../utils/tools'
import { Button } from 'antd'

export default ({ md5,nox86_analysis_status }) => {

  const payload = {
    md5: md5
  }
  console.log(nox86_analysis_status)
  return <Button loading={!nox86_analysis_status}  size="small" style={{ background: "#4c4f53",color:"#fff" }}>
  { 
    nox86_analysis_status?
  <a style={{ color: "#fff" }} target="_blank" href={"/#/api/query/sample_non_x86_sandbox_report" + tools.jsonToQueryString(payload)}>非X86沙箱报告链接</a>
:"报告生成中..."
}
   </Button>
}