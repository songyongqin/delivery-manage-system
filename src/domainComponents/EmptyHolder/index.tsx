import * as React from 'react'
import { LIGHT_THEME, DARK_THEME } from 'configs/ConstConfig'
import WithCommonProps from 'domainComponents/WithCommonProps'
import { Icon } from 'antd'

const EmptyHolder = ({ theme = LIGHT_THEME }) => {
  return (
    <p style={{ height: "400px", lineHeight: "400px", textAlign: "center" }}>
      <Icon type="frown-o" />&nbsp;暂无数据
    </p>
  )
}

export default WithCommonProps(EmptyHolder)