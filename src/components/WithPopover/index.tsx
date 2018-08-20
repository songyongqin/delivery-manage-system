
import React from 'react'
import { Popover } from 'antd'

const WithPopover = ({ style={}, text }) => 
  <Popover title={ text } >
    <div style={{  whiteSpace:'nowrap',
         overflow:'hidden', 
         textOverflow:'ellipsis', ...style }} >
         {text}
    </div>
  </Popover>


export default WithPopover