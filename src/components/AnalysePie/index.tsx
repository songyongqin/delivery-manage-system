
import PieCharts from 'domainComponents/PieCharts/async'
import React from 'react'
import { isArray, sum } from 'lodash'
const styles = require('./index.less')

const Wrap = props => {
  return (
    <div className={ styles.container } >
      { props.children }
    </div>
  )
}

const getTotal = (arr) => {
  if(!isArray(arr)||(isArray(arr)&&arr.length===0)){
    return '0'
  }
  else {
    let array = arr.map(i => typeof i.value ==='number' ? i.value : 0 )
    return `${sum(array)}`
  }
}

const Total = ({ num }) => {
  const needAddComma = num >1000000;
  let str = needAddComma ? `${addComma(Math.round(num/1000))}万` : addComma(Math.round(num))
  return (
    <div  className={ styles.total } >
      { str }
    </div>
  )
}

const addComma = num => (num+'').replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g,'$1,')

const AnalysePie = ({ data, text, link='#'  }) => {
  return (
    <Wrap>
        <PieCharts data={ data } titles={{ text, link }}   />
        <Total num={ getTotal(data) } />
    </Wrap>
  )
}


export default AnalysePie