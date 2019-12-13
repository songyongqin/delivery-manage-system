import * as React from 'react'
import * as tools from '../../utils/tools'
import { Button, Divider } from 'antd'

export default ({ md5,nox86_analysis_status }) => {

  const payload = {
    md5: md5
  }

  return <a style={{display:"block", color: "#0000FF",textDecoration:"underline",fontSize: 14, fontWeight: 400}} target="_blank" href={"/#/api/query/sample_x86_sandbox_report" + tools.jsonToQueryString(payload)}>X86沙箱报告链接</a>
//   <Button 
//   size="small" style={{ background: "#4c4f53",color:"#fff",display:"block"  }}>
//   { 
//   <a style={{ color: "#0000FF"}} target="_blank" href={"/#/api/query/sample_x86_sandbox_report" + tools.jsonToQueryString(payload)}>X86沙箱报告链接</a>
// }
//    </Button>
}