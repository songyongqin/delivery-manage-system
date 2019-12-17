import * as React from 'react'

export default ({ value }) => {
  // return <div style={{ textAlign: "center" }}>{value == "1" ? "分析完成" : value == "-1" ? "分析失败" : value == "0" ? "分析中" : null}</div>
  if(value == 1) {
    return <div style={{ textAlign: "center",color: "#4B7902" }}>分析完成</div>
  } else if (value == 0) {
    return <div style={{ textAlign: "center",color: "#C8CC00"}}>分析中</div>
  }else {
    return (
      <div>
        <div style={{ textAlign: "center",color: "#333333"}}>提交分析失败</div>
        <div style={{ textAlign: "center",color: "#0000FF",textDecoration:"underline",cursor:"pointer"}}>重新提交</div>
      </div>
    )
  }
}