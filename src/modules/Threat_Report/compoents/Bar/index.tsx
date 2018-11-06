

import React from 'react'
import WithBarChart from  'components/WithBarChart'
import { Icon } from 'antd'
const css = require('./index.less')
import dataSetName from 'utils/dataSetName'


const Bar = ( { data, title } )=> {
  return(
    <div className={ css.card } >
      <div  className={ css.title } >
        <Icon type="bar-chart" />
        <span className={ css.text } >{ title }</span>
      </div>
      <WithBarChart data={ dataSetName(data) } />
    </div>
  )
}

export default Bar