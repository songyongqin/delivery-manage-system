


import React from 'react'
import CountUp from 'react-countup'
import ExtraIcon from 'components/Icon'
const style = require('./index.less')

const CountIcon = ({title, icon, count=0}) => {
  return (
    <div className={ style.container } >
    <div className={ style.content } >
      <div>
        <ExtraIcon type={ 'eyedropper' } />
      </div>
      <div className={ style.count } >
        <CountUp start={0} end={ count } />
      </div>
      <div>{ title }</div>
    </div>
    </div>
  )
}

export default CountIcon
