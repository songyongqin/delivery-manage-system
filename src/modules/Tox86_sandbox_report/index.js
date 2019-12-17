// import * as React from 'react'
// import * as tools from '../../utils/tools'
// import { Button, Divider } from 'antd'

// export default ({ md5,nox86_analysis_status }) => {

//   const payload = {
//     md5: md5
//   }
//return <a style={{display:"block", color: "#0000FF",textDecoration:"underline",fontSize: 14, fontWeight: 400}} target="_blank" href={"/#/api/query/sample_x86_sandbox_report" + tools.jsonToQueryString(payload)}>X86沙箱报告链接</a>
//   <Button 
//   size="small" style={{ background: "#4c4f53",color:"#fff",display:"block"  }}>
//   { 
//   <a style={{ color: "#0000FF"}} target="_blank" href={"/#/api/query/sample_x86_sandbox_report" + tools.jsonToQueryString(payload)}>X86沙箱报告链接</a>
// }
//    </Button>
// }


import * as React from 'react'
import * as tools from '../../utils/tools'
import { Button } from 'antd'

export default ({ md5, x86_analysis_status }) => {


  const payload = {
    md5: md5
  }

  return <Button loading={!x86_analysis_status} size="small" style={{ background: "#4c4f53", color: "#fff" }}>
    {
      x86_analysis_status
        ?
        <a style={{ color: "#fff" }} target="_blank" href={"/#/api/query/sample_x86_sandbox_report" + tools.jsonToQueryString(payload)}>X86沙箱报告链接</a>
        :
        "报告生成中..."
    }
  </Button>
}