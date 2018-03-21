import * as React from 'react'
import { LIGHT_THEME, DARK_THEME } from 'constants/theme'
import WithCommonProps from 'domainComponents/WithCommonProps'
import { Icon } from 'antd'

const EmptyHolder = ({ theme = LIGHT_THEME }) => {
  return (
    <p style={{ height: "400px", lineHeight: "400px", textAlign: "center", fontSize: "30px" }}>
      <Icon type="frown-o" />&nbsp;建设中...
    </p>
  )
}

export default WithCommonProps(EmptyHolder)