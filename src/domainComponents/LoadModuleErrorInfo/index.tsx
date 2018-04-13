import * as React from 'react'
import { Icon } from 'antd'


export default ({ error }) => {
  return (
    <div style={{ fontSize: "18px", height: "100px", lineHeight: "100px", textAlign: "center" }}>
      <Icon type="frown" />&nbsp;模块加载失败：{error}
    </div>
  )
}