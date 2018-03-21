import * as React from 'react'
import { Card } from 'antd'
const styles = require("./styles.less")
import classnames from 'classnames'
import { LIGHT_THEME, DARK_THEME } from 'constants/theme'
import WithCommonProps from 'domainComponents/WithCommonProps'
import { omit } from 'utils'

const WrappedCard = (props: any) => {
  const { className = "", theme = DARK_THEME } = props

  let finalProps = omit(["dispatch", 'theme', 'userData', 'login'], props)

  const finalClasses = classnames({
    [styles["card"]]: true,
    [styles[theme]]: true,
    [className]: true
  })

  return <Card {...finalProps} className={finalClasses}></Card>
}

export default WithCommonProps(WrappedCard)