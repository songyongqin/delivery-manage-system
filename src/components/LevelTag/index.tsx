


import React from 'react'

import { Tag } from 'antd'

let tranformColor = text => {
  if(text==='低危') return '#fccb00'
  if(text==='中危') return '#db3e00'
  else return '#b80000'
}


const LevelTag = ({ text }) => {
  return (
    <Tag color={ tranformColor(text) } >{text}</Tag>
  )
}

export default LevelTag