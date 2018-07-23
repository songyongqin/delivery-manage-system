


import React, { ReactChild } from 'react'
import CountUp from 'react-countup'
import ExtraIcon from 'components/Icon'
const styles = require('./index.less')

interface props {
  title: string,
  count:number,
  style?:object,
  children: ReactChild
}



const CountIcon = (props:props) => {
  const { title, count, style, children } = props
  let counts = count ? count : 0
  return (
    <div className={ styles.container } >
    <div className={ styles.content } style={ style } >
      <div>
        { children }
      </div>
      <div className={ styles.count } >
        <CountUp start={0} end={ counts } />
      </div>
      <div>{ title }</div>
    </div>
    </div>
  )
}

export default CountIcon
