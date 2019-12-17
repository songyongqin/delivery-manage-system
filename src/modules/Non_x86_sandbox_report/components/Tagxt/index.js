import { Tag, Popover } from 'antd'
import * as React from 'react'

const _Tag = props => {

  try {
    let { overflow = 30, children } = props,
      value = children

    if (typeof children === 'string') {

      if (children.length > overflow) {
        value = <Popover content={<p>{children}</p>} >
          {children.substr(0, overflow) + "..."}
        </Popover>;
      } else {
        value = children;
      }

    }

    if (value === null || value === undefined || value === "") {
      return ""
    }

    return <Tag
      {...props}
      style={{ textAlign: "center", cursor: "text", ...(props.style || {}) }}
      children={value} />

  } catch (e) {
    return ""
  }
}

export default _Tag