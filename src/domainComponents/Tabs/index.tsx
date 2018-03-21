import * as React from 'react'
import { getKeyText } from 'utils'
import { Tabs } from 'antd'
import classnames from 'classnames'
const styles = require("./styles.less")
import WithCommonProps from 'domainComponents/WithCommonProps'

@WithCommonProps
export default class extends React.Component<any, any>{
  static TabPane = Tabs.TabPane
  constructor(props) {
    super(props)
  }
  render() {
    const { theme } = this.props

    const className = classnames({
      [this.props.className]: this.props.className,
      [styles[theme]]: true,
      [styles["tabs"]]: true
    })

    return <Tabs {...this.props} className={className}></Tabs>
  }
}