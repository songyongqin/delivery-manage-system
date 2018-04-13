import * as React from 'react'
import classnames from 'classnames'
// const styles = require("./style.css")
interface Props {
  type: string,
  style?: object,
  className?: string,
  children?: any
}
export default ({ type, children, style = {}, className }: Props) => {

  const classNames = classnames({
    [`icon-${type}`]: !!type,
    [className]: !!className
  })
  return <b className={classNames}
    style={{ ...style }}>
    {children}
  </b>
}
