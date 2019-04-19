


import React from 'react'

import { Tag } from 'antd'

let tranformColor = text => {
  if(text==='低危') return '#F9C700'
  if(text==='中危') return '#FE9D45'
  else return '#FE4545'
}


const LevelTag = ({ text }) => {
  let color = tranformColor(text)
  return (
    // <Tag color={ tranformColor(text) } >{text}</Tag>
    <div style={{ color: color, display: 'flex' , alignItems: 'baseline' }} >
      <div style={{ width: 8, height: 8, borderRadius: '50%', margin: 10, backgroundColor: color  }} ></div>
      { text }
    </div>
  )
}

export default LevelTag