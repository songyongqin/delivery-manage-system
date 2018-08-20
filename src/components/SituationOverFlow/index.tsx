import columnsCreator from 'utils/columnsCreator'
import * as React from 'react'
import { Popover } from 'antd'

interface Props {
  style?: object
}


export default class extends React.Component<Props, any>{
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { target } = this
    if (!target) {
      return
    }
    target.parentNode.style.position = "relative"

  }
  target = null
  render() {
    const { style = {}, children } = this.props
    return (
      <Popover content={children} placement="bottomLeft">
        <p
          ref={target => this.target = target}
          className={"overflow-text"}
          style={{
            margin: "0",
            position: "absolute",
            height: "40px",
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