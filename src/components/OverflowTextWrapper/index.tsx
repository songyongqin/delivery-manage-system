import columnsCreator from 'utils/columnsCreator'
import * as React from 'react'
import { Popover } from 'antd'
const styles = require("./styles.less")
interface Props {
  style?: object,
  trigger?: "hover" | "click" | "focus",
  content?: any
}


export default class extends React.Component<Props, any>{
  constructor(props) {
    super(props)
  }
  target = null
  componentDidMount() {
    const { target } = this
    if (!target) {
      return
    }
    target.parentNode.style.position = "relative"
  }
  render() {
    const { style = {}, children, trigger = "hover", content } = this.props
    return (
      <Popover
        trigger={trigger}
        content={content || children}
        placement="topLeft">
        <p
          ref={target => this.target = target}
          className={styles["overflow-text"]}
          style={{
            margin: "0",
            position: "absolute",
            lineHeight: "40px",
            padding: "0 10px",
            top: 0, bottom: 0, left: 0, right: 0,
            ...style,
          }}>
          {children}
        </p>
      </Popover>
    )
  }
}