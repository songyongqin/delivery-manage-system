

import React, { ReactChild } from 'react'
import { Icon } from 'antd'
const style = require('./index.less')

interface props{
  text: string
  selected: string
  children: ReactChild
  onClick: Fnc
}

interface Fnc{
  (e:any):any
}

const SwitchItem = (props:props) => {
  return (
    <div>
      <div  className={ style.content } onClick={ props.onClick } 
            data-id={ props.text } >
          { props.text }
          <Icon type={ props.text===props.selected? "minus-circle":"plus-circle" }  className={ style.icon } />
      </div>
      { props.children }
    </div>
  )
}

export default SwitchItem