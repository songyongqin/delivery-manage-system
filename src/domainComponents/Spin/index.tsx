import * as React from 'react'
const styles = require("./styles.less")
import classnames from 'classnames'
import { LIGHT_THEME, DARK_THEME } from 'constants/theme'
import WithCommonProps from 'domainComponents/WithCommonProps'

const LoadingEffect = () => (
  <div className={styles["loading"]}>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
)

@WithCommonProps
class Spin extends React.Component<any, any>{
  constructor(props) {
    super(props)
  }
  render() {
    const { theme = DARK_THEME, full, children, spinning, style = {} } = this.props

    const classes = classnames({
      [styles["spin"]]: true,
      [styles[theme]]: true,
      [styles["fullScreen"]]: full,
      [styles["holder"]]: !children,
      [styles["hidden"]]: (!spinning) && (!children),
      [styles["spinning"]]: spinning
    })

    const loadingClasses = classnames({
      [styles["wrapper"]]: true,
      [styles["hidden"]]: !spinning,
    })

    return (
      <div className={classes}>
        {
          spinning&&<div className={loadingClasses}>
          <LoadingEffect></LoadingEffect>
        </div>
        }
        <div className={spinning ? styles["blur"] : styles["content-wrapper"]} style={style}>
          {children}
        </div>
      </div>
    )
  }
}

export default Spin