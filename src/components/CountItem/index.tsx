


import React from 'react'
import CountUp from 'react-countup'
import ExtraIcon from 'components/Icon'
const styles = require('./index.less')

interface props {
  title: string,
  count:number,
  style?:object,
  children: ChildNode
}



const CountIcon = props => {
  const { title, count=0, style } = props
  return (
    <div className={ styles.container } >
    <div className={ styles.content } style={ ...style } >
      <div>
        { ...props.children }
      </div>
      <div className={ styles.count } >
        <CountUp start={0} end={ count } />
      </div>
      <div>{ title }</div>
    </div>
    </div>
  )
}

export default CountIcon
