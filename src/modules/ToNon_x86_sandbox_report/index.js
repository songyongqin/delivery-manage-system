import * as React from 'react'
import * as tools from '../../utils/tools'
import { Button } from 'antd'

export default ({ md5, x86_analysis_status }) => {


  const payload = {
    md5: md5
  }

  return <a style={{ display:"block",marginTop:20 ,color: "#0000FF",textDecoration:"underline",fontSize: 14, fontWeight: 400}} target="_blank" href={"/#/api/query/sample_non_x86_sandbox_report" + tools.jsonToQueryString(payload)}>非X86沙箱报告链接</a>
  // <Button  size="small" style={{ background: "#4c4f53", color: "#fff" }}>
  //   {
  //     <a style={{ color: "#fff" }} target="_blank" href={"/#/api/query/sample_non_x86_sandbox_report" + tools.jsonToQueryString(payload)}>非X86沙箱报告链接</a>
  //   }
  // </Button>
}