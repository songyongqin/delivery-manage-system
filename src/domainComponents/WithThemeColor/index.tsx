import * as React from 'react'
import { connect } from 'dva'
import classnames from 'classnames'
const styles = require("./styles.less")
import WithCommonProps from 'domainComponents/WithCommonProps'



export default WrappedComponent => {

  @WithCommonProps
  class FinalComponent extends React.Component<any> {
    constructor(props) {
      super(props)
    }
    render() {
      const { className = "", theme } = this.props
      const finalClasses = classnames({
        [className]: true,
        [styles["txt"]]: true,
        [styles[theme]]: true
      })
      return <WrappedComponent {...this.props} className={finalClasses}></WrappedComponent>
    }
  }

  return <FinalComponent></FinalComponent>
}

