import * as React from 'react'
import { Collapse } from 'antd'
import classnames from 'classnames'
import WithCommonProps from 'domainComponents/WithCommonProps'
const styles = require("./styles.less")


@WithCommonProps
class DomainCollapse extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }
  static Panel = Collapse.Panel
  render() {

    const className = classnames({
      [styles["collapse"]]: true,
      [styles[this.props.theme]]: true,
      [styles[this.props.className]]: this.props.className
    })

    return <Collapse {...this.props} className={className}></Collapse>
  }

}


export default DomainCollapse