

import React from 'react'
import WithBarChart from  'components/WithBarChart'
import { Icon } from 'antd'
const css = require('./index.less')
import dataSetName from 'utils/dataSetName'


const Bar = ( { data, title, className } )=> {
  return(
    <div className={ css.card } >
      <div  className={ css.title } >
        <Icon type="bar-chart" />
        <span className={ css.text } >{ title }</span>
      </div>
      <div className={ className } >
        <WithBarChart data={ dataSetName(data) } />
      </div>
    </div>
  )
}

export default Bar