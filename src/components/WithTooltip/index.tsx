
import React from 'react'
import { Tooltip } from 'antd'

const WithTooltip = ({ style={}, text }) => 
  <Tooltip title={ text } >
    <div style={{ width:200, whiteSpace:'nowrap',
         overflow:'hidden', 
         textOverflow:'ellipsis', ...style }} >
         {text}
    </div>
  </Tooltip>


export default WithTooltip