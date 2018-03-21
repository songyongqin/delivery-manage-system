import { Tag, Popover } from 'antd'
import * as React from 'react'

export default props => {

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

  return <Tag
    {...props}
    style={{ textAlign: "center", cursor: "text", ...(props.style || {}) }}
    children={value} />

}